import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Header  from "../component/Header";
import Footer from "../component/Footer";
import ProductDetail from "../component/ProductDetail";
import Swal from "sweetalert2";

import { fetchCheckStock} from "../service/api";
const ProductDetailPage = () => {
    const { productId } = useParams(); // ✅ Lấy productId từ URL
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || []; // Lấy từ localStorage
    });

    const handleAddToCart = async (product, quantity) => {
        try {
            // Gọi API kiểm tra số lượng tồn kho
            // const response = await fetch(`http://localhost:8088/api/product/check-stock/${product.id}`);
            // const { maxQuantity } = await response.json(); // maxQuantity từ API
            const { maxQuantity } = await fetchCheckStock(product.id);
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.productId === product.id);
                let updatedCart;
    
                if (existingItem) {
                    const newQuantity = existingItem.quantity + quantity;
    
                    if (newQuantity > maxQuantity) {
                        alert(`Chỉ còn ${maxQuantity} sản phẩm trong kho!`);
                        return prevCart; // Không cập nhật nếu vượt quá tồn kho
                    }
    
                    // Cập nhật số lượng nếu hợp lệ
                    updatedCart = prevCart.map((item) =>
                        item.productId === product.id ? { ...item, quantity: newQuantity } : item
                    );
                } else {
                    if (quantity <= 0 || quantity > maxQuantity) {
                        alert(`Số lượng không hợp lệ! Chỉ còn ${maxQuantity} sản phẩm.`);
                        return prevCart; // Không thêm nếu số lượng không hợp lệ
                    }
    
                    // Thêm sản phẩm mới vào giỏ hàng
                    updatedCart = [...prevCart, { productId: product.id, quantity }];
                }
    
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu vào localStorage
                
                Swal.fire({
                    title: "Thành công!",
                    text: "Sản phẩm đã được thêm vào giỏ hàng.",
                    icon: "success",
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return updatedCart;
            });
        } catch (error) {
            console.error("Lỗi khi kiểm tra tồn kho:", error);
            alert("Lỗi khi kiểm tra tồn kho, vui lòng thử lại!");
        }
    };

    return (
        <>
            <Header />
            <main className="p-6 flex justify-center bg-gray-100 min-h-screen">
                <ProductDetail 
                    productId={productId} 
                    onAddToCart={handleAddToCart} 
                />
            </main>
            <Footer />
        </>
    );
};
export default ProductDetailPage;