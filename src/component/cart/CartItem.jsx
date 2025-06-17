import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const CartItem = ({ product,onSelect, isSelected, onIncrease, onDecrease, onRemove }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };
    return (
        <div className="flex items-center justify-between gap-4 border-b 
        border-gray-400 py-3 pl-5 pr-10 box-border ">
            <input type="checkbox" className="w-5 h-5" 
                    checked={isSelected} onChange={onSelect}/>
            <img className="w-32 h-32 rounded-md object-contain" 
              onClick={handleClick}
            src={product.image} alt={product.name}/>
            <div className="flex flex-col w-80"   onClick={handleClick}>
                <span className="font-semibold" >{product.name}</span>
                <span className="text-gray-600">{product.price.toLocaleString()} đ/{product.unit}</span>
            </div>
            <div className="quantity-controls
                            flex items-center justify-center gap-2 w-[120px] ">
                <button className="px-[0.8em] py-[0.3em]" onClick={() => onDecrease(product.id)}>−</button>
                <span>{product.quantity}</span>
                <button className="px-[0.8em] py-[0.3em]" onClick={() => onIncrease(product.id)}>+</button>
            </div>
            <div className="total-price w-[140px] text-center font-semibold">
                <span>{(product.price * product.quantity).toLocaleString()}đ</span>
            </div>
            <button className=" px-[0.8em] py-[0.1em]  bg-red-600 w-[40px] rounded
                                flex justify-center hover:bg-red-500"
                    onClick={() => onRemove(product.id)}>
                <TrashIcon  className="w-8 h-8 text-white text-[20px]"/>
            </button>
        </div>
    );
};

export default CartItem;