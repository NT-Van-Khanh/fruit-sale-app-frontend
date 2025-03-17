import React, {useState, useEffect } from "react";
import CartItem from "./CartItem";

const CartList = ({cart,onSelect, selectedItems,onSelectAll, isAllSelected,  products, onIncrease, onDecrease, onRemove }) => {

    return (
        <div className="cart-list w-4/6 m-2 p-5 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between gap-4 py-3 pl-5 pr-10 ">
                <div>
                    <input type="checkbox" className="w-5 h-5"
                        checked={isAllSelected}  onChange={onSelectAll} />
                    <span className="font-semibold text-[18px] pl-6">Chọn tất cả</span>
                </div> 
                <span className="font-semibold text-[18px] w-63">Tên sản phẩm </span>
                <span className="font-semibold text-[18px]" >Số lượng</span>
                <span className="font-semibold text-[18px]">Thành tiền</span>
                <span></span>
            </div>
            {cart.length > 0 ? (
                cart.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    return product ? (
                        <CartItem
                            key={item.productId}
                            product={product}
                            isSelected={selectedItems.has(product.id)}
                            onSelect={() => onSelect(product.id)} 
                            quantity={item.quantity}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                            onRemove={onRemove}
                        />
                    ) : null;
                })
            ) : (
                <p className="font-semibold">Giỏ hàng trống.</p>
            )}
        </div>
    );
};

export default CartList;

// const [products, setProducts] = useState([]);
    
    // useEffect(() => {
    //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     if (cart.length === 0) {
    //         setProducts([]);
    //         return;
    //     }

    //     const fetchProducts = async () => {
    //         try {
    //             const productData = await Promise.all(
    //                 cart.map(async ({ productId, quantity }) => {
    //                     const response = await fetch(`http://localhost:8088/api/product/simple/${productId}`);
    //                     const product = await response.json();
    //                     return { ...product, quantity }; // Gán số lượng từ cart
    //                 })
    //             );
    //             setProducts(productData);
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         }
    //     };
    //     fetchProducts();
    // },[]);
