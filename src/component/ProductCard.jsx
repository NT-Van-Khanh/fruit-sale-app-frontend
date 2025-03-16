import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({product, onAddToCart}) =>{
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };
    return(
        <div className="bg-white p-4 shadow-md rounded-lg
            cursor-pointer transition-transform hover:scale-105"
            onClick={handleClick}>

            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-sm font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">{product.price.toLocaleString()} VND/{product.unit}</p>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md 
                        hover:bg-green-600 w-9/10" 
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn chặn event click vào card khi nhấn nút
                            onAddToCart(product);
                        }}>
                Thêm vào giỏ </button>
        </div>
    );
};  

export default ProductCard;