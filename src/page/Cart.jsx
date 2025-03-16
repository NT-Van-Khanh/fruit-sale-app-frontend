import React, {useEffect, useState} from "react";
import Header  from "../component/Header";
import Footer from "../component/Footer";
import CartList from "../component/CartList";
import CartSummary from "../component/CartSummary";

const CartPage = () => {
    // const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const data = JSON.parse(localStorage.getItem("cart")) || [];
                setCart(data);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            }
        };

        fetchProducts();
    },[]);

    // Tăng số lượng
    const increaseQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Giảm số lượng
    const decreaseQuantity = (id) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Xóa sản phẩm
    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Tính tổng tiền
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = total * 0.1; // Ví dụ giảm 10%

    // Thanh toán
    const handleCheckout = () => {
        alert("Chuyển đến trang thanh toán!");
    };


    return (
        < >
            <Header />
            <main className="p-[6px] flex justify-between bg-gray-100 "> 
                {/* <Cart products = {products}/> */}
                    <CartList
                        products={cart}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onRemove={removeItem} />
                    <CartSummary 
                        total={total} 
                        discount={discount} 
                        onCheckout={handleCheckout} />
            </main>
            <Footer/>
        </>
    );
}

export default CartPage;
