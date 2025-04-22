import React,  {useState} from "react";
const ProductDetailInfo = ({ product, onAddToCart,handleInputChange, handleIncrease})=>{
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col w-[90%] max-w-4xl p-6 rounded-xl shadow-lg bg-white mx-auto">
            <h2 className="pl-2 pb-5 text-gray-600
                        text-left font-bold text-[25px]">Thông tin sản phẩm</h2>
            <div className="flex flex-col md:flex-row items-center gap-6 pl-3">
                <div className="rounded-lg shadow-md overflow-hidden w-100">
                    <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                </div>
                <div className="flex flex-col gap-1 ml-2 text-left text-gray-800 w-full">
                    <h2 className="text-2xl font-bold text-orange-400">{product.name}</h2>
                    <p className="text-lg text-gray-500">
                        Xuất sứ: {product.category}</p>
                    <p className="text-lg text-gray-500 font-medium pt-2">
                        Giá: {product.price.toLocaleString()} VND/{product.unit} </p>
                    <div className="flex items-center mt-4">
                        <label className="text-lg text-gray-600 mr-2">Thêm vào giỏ:</label>
                        <button
                            className="px-3 py-[2px] text-[18px]  text-centerr bg-gray-200
                            rounded-tl-lg rounded-bl-lg"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        >-</button>
                        <input value={quantity} min ="1" type="number"
                            onChange = {(e)=> handleInputChange(e, setQuantity)}
                            className="px-4 py-[1.5px] min-w-[24px] max-w-[150px] border border-gray-200 
                                    text-center text-lg font-medium text-gray-600 "/>
                        <button
                            className="px-3  py-[2px]  text-[18px]  text-center bg-gray-200
                            rounded-tr-lg rounded-br-lg"
                            onClick={() => handleIncrease(quantity, setQuantity)}
                        >+</button>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-400
                                    text-white rounded"
                        onClick={() => onAddToCart(product, quantity, setQuantity)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <div className="product-detail items-left pt-5">
                <label className="text-[15px] text-left mt-3">{product.detail}</label>
            </div>
        </div>
    );

};


export default ProductDetailInfo;