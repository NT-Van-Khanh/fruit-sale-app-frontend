import React,{useState,  useRef, useEffect} from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({products, onAddToCart}) => {
    // console.log("Sản phẩm render:", products); // Debug dữ liệu
    const [visibleProducts, setVisibleProducts] =  useState(10);
    const observerRef = useRef(null);
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleProducts((prev) => Math.min(prev + 8, products.length)); // Tải thêm 8 sản phẩm
          }
        },
        { threshold: 1.0 } // Kích hoạt khi phần tử xuất hiện hoàn toàn
      );
  
      if (observerRef.current) {
        observer.observe(observerRef.current);
      }
  
      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    }, [products]);


    return(
      <div className="product-grid-section">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}  />
          ))}
        </div>
          {/* Phần tử theo dõi - để kích hoạt tải thêm */}
          {visibleProducts < products.length && <div ref={observerRef} className="h-10"></div>}
      </div>
    );
};

export default ProductGrid; 

      // {/* Nút Xem Thêm */}
      // {visibleProducts < products.length && (
      //   <div className="text-center mt-6">
      //     <button
      //       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      //       onClick={() => setVisibleProducts(visibleProducts + 8)}
      //     >
      //       Xem thêm
      //     </button>
      //   </div>
      // )}