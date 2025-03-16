import React from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({products, onAddToCart}) =>{
    const latestProducts = products.slice(0, 8);

    return (
        <div>
            <h2 className="text-gray-600 text-[23px] text-left font-bold mb-2 pl-2">Sản phẩm nổi bật</h2>
            <div className="flex overflow-x-auto sscroll-smooth snap-x space-x-4 p-2 scrollbar-hide">
                {latestProducts.map((product) => (
                <div key={product.id} className="w-56 flex-shrink-0 snap-start">
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                </div>
                ))}
            </div>
        </div>
    );
};
export default FeaturedProducts;