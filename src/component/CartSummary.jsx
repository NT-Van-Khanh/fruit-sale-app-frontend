import React from "react";

const CartSummary = ({ total, discount, onCheckout }) => {
    return (
        <div className="cart-summarym-1 shadow-lg rounded-lg bg-white p-3 m-2
        md:w-2/6 w-full box-border">
        {/*  w-full sm:w-2/6 md:w-2/6 lg:w-2/6 xl:w-2/6"> */}
            <h2 className="text-[25px] text-left font-bold pl-3 pt-2 pb-5 text-gray-600">THÔNG TIN THANH TOÁN</h2>
            <div>
                <div className="flex justify-between font-semibold text-gray-700 text-[17px]
                                pl-8 pr-5 pt-2 pb-3">
                    <h3>Thành tiền</h3>
                    <span>{total.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700 text-[17px]
                                pl-8 pr-5 pt-2 pb-5">
                    <h3>Khuyến mãi</h3>
                    <span>{discount.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between font-bold text-gray-700 text-[18px]
                                pl-8 pr-5 pt-2 pb-8">
                    <h3>Tổng đơn hàng</h3>
                    <span>{(total - discount).toLocaleString()}đ</span>
                </div>
                <button className="w-9/10 bg-orange-400 rounded hover:bg-orange-500
                                    text-[18px] text-white px-[1.2em] py-[0.6em]"
                        onClick={onCheckout} >THANH TOÁN</button>
            </div>
        </div>
    );
};

export default CartSummary;