import React, {useEffect, useState} from "react";
import Header  from "../component/Header";
import Footer from "../component/Footer";
import CartList from "../component/CartList";
import CartSummary from "../component/CartSummary";

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
                    cart.map(({ productId }) => fetch(`http://localhost:8088/api/product/simple/${productId}`))
                );

                const productData = await Promise.all(
                    responses.map(async (res, index) => {
                        if (!res.ok) throw new Error(`Lỗi API với ID ${cart[index].productId}`);
                        const product = await res.json();
                        return { ...product, quantity: cart[index].quantity };
                    })
                );
                setProducts(productData);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm", error);
            }
        };
        fetchProducts();
    },[cart]);

    const checkStock = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8088/api/product/check-stock/${productId}`);
            
            if (!response.ok) {
                const text = await response.text(); // Lấy toàn bộ phản hồi
                console.error("Lỗi từ server:", text);
                return 0; // Trả về 0 nếu API có lỗi
            }

            const data = await response.json();
            console.log("Dữ liệu tồn kho nhận được:", data); // Log để kiểm tra
            
            if (typeof data === "number") {
                return data; // Nếu API trả về số, thì đây là số lượng tồn kho
            } else {
                console.error("Phản hồi API không hợp lệ:", data);
                return 0;
            }
        } catch (error) {
            console.error("Lỗi kiểm tra kho:", error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };

    const increaseQuantity = async (productId) => {
        const stock = await checkStock(productId);

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
            const updatedCart = prevCart
                .map((item) =>
                    item.productId === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0); // Loại bỏ sản phẩm có quantity = 0
    
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Xóa sản phẩm
    const removeItem = (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.productId !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
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
    const discount = total * 0.0; // Ví dụ giảm 10% total*0.1
    
    const toggleSelectAll = () => {
        if (selectedItems.size === cart.length) {
            setSelectedItems(new Set()); // Bỏ chọn tất cả
        } else {
            setSelectedItems(new Set(cart.map((item) => item.productId))); // Chọn tất cả
        }
    };
    
    const isAllSelected = selectedItems.size === cart.length && cart.length > 0;


    // Thanh toán
    const handleCheckout = () => {
        alert("Chuyển đến trang thanh toán!");
    };


    return (
        <div className="min-h-screen flex flex-col" >
            <Header />
            <main className="px-2 pt-3 pb-5 flex justify-between bg-gray-100"> 
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

    // const productData = await Promise.all(
    //     cart.map(async ({ productId, quantity }) => {
    //         const response = await fetch(`http://localhost:8088/api/product/simple/${productId}`);
    //         const product = await response.json();
    //         return { ...product, quantity };
    //     })
    // );
