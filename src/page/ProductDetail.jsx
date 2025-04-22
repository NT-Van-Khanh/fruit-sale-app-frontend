import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Header  from "../component/Header";
import Footer from "../component/Footer";
import ProductDetailInfo from "../component/ProductDetailInfo";
import Swal from "sweetalert2";

import {fetchProductDetailById, fetchCheckStock} from "../service/api";
const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { productId } = useParams(); // Lấy productId từ URL
    // Lấy từ localStorage
    const [cart, setCart] = useState(() => {  return JSON.parse(localStorage.getItem("cart")) || [];});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetchProductDetailById(productId);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = async (product, quantity, setQuantity) => {
        try {
            const maxQuantity = await fetchCheckStock(product.id); 
            console.log("Số lượng sản phẩm PD: ",maxQuantity);
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.productId === product.id);
                const inCartQuantity = existingItem ? existingItem.quantity : 0;
                const maxAvailableQuantity = maxQuantity - inCartQuantity;
                if(quantity > maxAvailableQuantity){
                    Swal.fire({
                            icon: "warning",
                            title: "Số lượng không hợp lệ!",                
                            text: `Chỉ có thể thêm tối đa ${maxAvailableQuantity} vào giỏ hàng.`,
                            position: "bottom-end",      
                            toast: true,      
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        });
                        setQuantity(maxAvailableQuantity);
                        return prevCart;
                }
                let updatedCart;
                if (existingItem) {
                    updatedCart = prevCart.map((item) =>
                        item.productId === product.id ? { ...item, quantity: inCartQuantity + quantity } : item
                    );
                } else {
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
                    timer: 3000,
                    timerProgressBar: true,
                });
                return updatedCart;
            });
        } catch (error) {
            console.error("Lỗi khi kiểm tra tồn kho:", error);
            Swal.fire({
                icon: "warning",
                title: "Lỗi khi kiểm tra tồn kho!",
                text: `Lỗi khi kiểm tra tồn kho, vui lòng thử lại.`,
            });
        }
    };
    
    const handleInputChange = async (e, setQuantity) => {
        const inputValue = e.target.value.replace(/[^\d]/g, ""); 
        if (inputValue  === "")  return;
        const val = parseInt(inputValue, 10);
        if (isNaN(val)) return;
        setQuantity(val);
    };

    const handleIncrease = async (quantity, setQuantity) => {
        const maxQuantity = await fetchCheckStock(product.id);
        const cartItem = cart.find(item => item.productId === product.id);
        const inCartQuantity = cartItem ? cartItem.quantity : 0; 
        const maxQuantityAvalable = maxQuantity - inCartQuantity;
        if (quantity >= maxQuantityAvalable ) {
            Swal.fire({
                icon: "warning",
                title: "Đạt số lượng tối đa",
                text: `Chỉ có thể thêm tối đa ${maxQuantityAvalable} vào giỏ hàng.`,
                position: "bottom-end",      
                toast: true,      
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
            setQuantity(maxQuantityAvalable);
            return;
        }
        setQuantity((q) => q + 1);
    };

    return (
        <>
            <Header />
            <main className="p-6 flex justify-center bg-gray-100 min-h-screen">
                {loading ? ( <p>Đang tải sản phẩm...</p> ) 
                    : error ? ( <p>Lỗi: {error}</p> ) 
                    : ( <ProductDetailInfo 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        handleInputChange={handleInputChange}
                        handleIncrease={handleIncrease}/>
                    )}
            </main>
            <Footer />
        </>
    );
};
export default ProductDetailPage;