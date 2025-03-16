import React from "react";
import CartItem from "./CartItem";

const CartList = ({ products, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="cart-list w-4/6 m-2 p-5 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between gap-4 py-3 pl-5 pr-10 ">
                <div>
                    <input type="checkbox" className="w-5 h-5"/>
                    <span className="font-semibold text-[18px] pl-6">Chọn tất cả</span>
                </div> 
                <span className="font-semibold text-[18px] w-63">Tên sản phẩm </span>
                <span className="font-semibold text-[18px]" >Số lượng</span>
                <span className="font-semibold text-[18px]">Thành tiền</span>
                <span></span>
            </div>
            {products.length > 0 ? (
                products.map((product) => (
                    <CartItem
                        key={product.id}
                        product={product}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        onRemove={onRemove}
                    />
                ))
            ) : (
                <p>Giỏ hàng trống.</p>
            )}
        </div>
    );
};

export default CartList;
