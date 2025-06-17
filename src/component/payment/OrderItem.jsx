
import { TrashIcon } from "@heroicons/react/24/outline";
const OrderItem = ({ product, quantity}) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b 
        border-gray-400 py-3 pl-6 pr-5 box-border ">
            <img className="w-20 h-20 rounded-md object-contain" 
            src={product.image} alt={product.name}/>
            <div className="flex flex-col w-80" >
                <span className="font-semibold" >{product.name}</span>
                <span className="text-gray-600">{product.price.toLocaleString()} đ/{product.unit}</span>
            </div>
            <div className="quantity-controls
                            flex items-center justify-center gap-2 w-[120px] ">
                <span>{ quantity}</span>

            </div>
            <div className="total-price w-[140px] text-center font-semibold">
                <span>{(product.price * quantity).toLocaleString()}đ</span>
            </div>
        </div>
    );
};

export default OrderItem;