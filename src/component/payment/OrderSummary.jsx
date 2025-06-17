import React, {useState} from "react";
import OrderItem from "../payment/OrderItem";
const OrderSummary = ({selectedProducts, selectedCartItems, total, discount, onCheckout }) => {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    // const handleCheckout = () => {
    //         onCheckout(paymentMethod);
    // };
    return (
        <div className="cart-summarym-1 shadow-lg rounded-lg bg-white p-3 m-2
        md:w-5/8 w-full box-border">
            <h2 className="text-[23px] text-left font-bold pl-3 pt-2 pb-3 text-gray-600">THÔNG TIN THANH TOÁN</h2>
            <div>
                <h3 className="text-[20px] text-orange-400 text-left font-bold pl-3 pb-2 text-gray-600">
                    Chi tiết đơn hàng</h3>
                <div className="flex items-center justify-between gap-4 py-3 pl-6 pr-5 ">
                    <span className="font-semibold text-[17px] w-20">Ảnh </span>
                    <span className="font-semibold text-[17px] w-30">Sản phẩm </span>
                    <span className="font-semibold text-[17px]" >Số lượng</span>
                    <span className="font-semibold text-[17px] w-30" >Thành tiền</span>
            </div>
                {selectedCartItems.length > 0 ? (
                    selectedCartItems.map(item => {
                        const product = selectedProducts.find(p => p.id === item.productId);                        return product ? (
                        <OrderItem 
                            key = {product.id}
                            product={product} 
                            quantity={ item.quantity}/>
                        ) : null;
                    })
                    ) : (
                    <p className="font-semibold">Đơn hàng trống.</p>
                    )}
                <div className="flex justify-between font-semibold text-gray-700 text-[17px]
                                pl-8 pr-5 pt-2 pb-2">
                    <h3>Thành tiền</h3>
                    <span>{total.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700 text-[17px]
                                pl-8 pr-5 pt-2 pb-2">
                    <h3>Khuyến mãi</h3>
                    <span>{discount.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between font-bold text-gray-700 text-[18px]
                                pl-8 pr-5 pt-2 pb-5 ">
                    <h3>Tổng đơn hàng</h3>
                    <span>{(total - discount).toLocaleString()}đ</span>
                </div>
                <h3 className="text-[20px] text-orange-400 text-left font-bold pl-3 pb-3 text-gray-600">
                    Phương thức thanh toán </h3>
                <div className="flex flex-col gap-3 pl-4 font-semibold text-[17px] text-gray-700
                    pb-8 pl-10">
                    <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                    Thanh toán khi nhận hàng
                    </label>

                    <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                    />
                    Chuyển khoản ngân hàng
                    </label>
                    </div>
                <button className="w-9/10 bg-orange-400 rounded hover:bg-orange-500
                                    text-[18px] text-white px-[1.2em] py-[0.6em]"
                        onClick={onCheckout}>THANH TOÁN</button>
            </div>
            
        </div>
    );
};

export default OrderSummary;