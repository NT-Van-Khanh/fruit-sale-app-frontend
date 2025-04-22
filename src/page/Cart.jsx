import React, {useEffect, useState} from "react";
import Header  from "../component/Header";
import Footer from "../component/Footer";
import CartList from "../component/CartList";
import CartSummary from "../component/CartSummary";
import Swal from "sweetalert2";

import {fetchProductSimpleInfo, fetchCheckStock} from "../service/api.js";
const CartPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    const [selectedItems, setSelectedItems] = useState(new Set());;

    // Lấy giỏ hàng từ localStorage
    useEffect(()=>{
        try {
            const cartData = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(cartData);
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        }
    },[]);

    // Fetch thông tin sản phẩm khi `cart` thay đổi
    useEffect(()=>{
        console.log(cart);
        if (cart.length === 0) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            try {
                const responses = await Promise.all(
                    cart.map(({ productId }) => fetchProductSimpleInfo(productId))
                );
                const productData = responses.map((product, index) => {
                    if (!product) {
                        throw new Error(`Lỗi lấy dữ liệu từ API với ID: ${cart[index].productId}`);
                    }
                    return { ...product, quantity: cart[index].quantity };
                });
                setProducts(productData);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm", error);
            }
        };
        fetchProducts();
    },[cart]);

    const checkStock = async (productId) => {
        try {
            const maxQuantity = await fetchCheckStock(productId);
            
            console.log("Dữ liệu tồn kho nhận được:", maxQuantity ); // Log để kiểm tra
            if (typeof maxQuantity  === "number") {
                return maxQuantity ; // Nếu API trả về số, thì đây là số lượng tồn kho
            } else {
                console.error("Phản hồi API không hợp lệ:", maxQuantity );
                return 0;
            }
        } catch (error) {
            console.error("Lỗi kiểm tra kho:", error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };

    const increaseQuantity = async (productId) => {
        const stock = await checkStock(productId);
        const productInCart = cart.find(item => item.productId === productId);
        if (!productInCart) return;

        if (productInCart.quantity >= stock) {
            Swal.fire({
                icon: "warning",
                title: "Vượt quá tồn kho!",
                text: `Chỉ còn ${stock} sản phẩm trong kho.`,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const updatedCart = cart.map((item) =>
            item.productId === productId && item.quantity < stock
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

    };

    // Giảm số lượng
    const decreaseQuantity = (id) => {
        setCart((prevCart) => {
            let updatedCart = prevCart.map((item) =>
                item.productId === id
                    ? { ...item, quantity: item.quantity - 1 } // Giảm số lượng
                    : item
            );
            updatedCart = updatedCart.filter((item) => item.quantity > 0);
    
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Xóa sản phẩm
    const removeItem = (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Sản phẩm sẽ bị xóa khỏi giỏ hàng!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                setCart((prevCart) => {
                    const updatedCart = prevCart.filter((item) => item.productId !== id);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    return updatedCart;
                });
                Swal.fire({
                    title: "Đã xóa!",
                    text: "Sản phẩm đã bị xóa khỏi giỏ hàng.",
                    icon: "success",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }    
        });
    };

    const toggleSelect = (productId) => {
        setSelectedItems(prevSelected => {
            const newSelected = new Set(prevSelected);
            newSelected.has(productId) ? newSelected.delete(productId) : newSelected.add(productId);
            return newSelected;
        });
    };
    // Tính tổng tiền
    // const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // const total = cart.reduce((sum, item) => {
    //     const product = products.find(p => p.id === item.productId);
    //     return product ? sum + product.price * item.quantity : sum;
    // }, 0);
    const total = cart.reduce((sum, item) => {
        if (!selectedItems.has(item.productId)) return sum; // Chỉ tính sản phẩm đã chọn
        const product = products.find(p => p.id === item.productId);
        return product ? sum + product.price * item.quantity : sum;
    }, 0);
    const discount = total * 0.0; // Ví dụ: giảm 10% -> total*0.1
    
    const toggleSelectAll = () => {
        if (selectedItems.size === cart.length) {
            setSelectedItems(new Set()); // Bỏ chọn tất cả
        } else {
            setSelectedItems(new Set(cart.map((item) => item.productId))); // Chọn tất cả
        }
    };
    
    // Thanh toán
    const handleCheckout = async() => {
        for (const item of cart) {
            const maxQuantity = await fetchCheckStock(item.productId);
            if (item.quantity <= 0 || item.quantity > maxQuantity) {
                alert("Số lượng sản phẩm vượt tồn kho, vui lòng kiểm tra lại.");
                return; // dừng lại nếu có lỗi
            }
        }

        alert("Chuyển đến trang thanh toán!");
    };


    return (
        <div className="min-h-screen flex flex-col box-border w-full" >
            <Header/>
            <main className="pt-3 pb-5  bg-gray-100 
                    flex flex-col md:flex-row justify-around w-full box-border"> 
                {/* <Cart products = {products}/> */}
                    <CartList 
                        cart = {cart}
                        products = {products}
                        
                        selectedItems={selectedItems} // Truyền danh sách sản phẩm được chọn
                        onSelect={toggleSelect}
                        onSelectAll={toggleSelectAll}
                        isAllSelected={selectedItems.size === cart.length && cart.length > 0}

                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onRemove={removeItem} />
                    <CartSummary 
                        total={total} 
                        discount={discount} 
                        onCheckout={handleCheckout} />
            </main>
            <Footer/>
        </div>
    );
}

export default CartPage;

