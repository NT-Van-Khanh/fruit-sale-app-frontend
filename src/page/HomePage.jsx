import React, {useEffect, useState} from "react";
import Header  from "../component/header/Header";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import Categories  from "../component/Categories";
import FeaturedProducts  from "../component/product/FeaturedProducts";
import ProductGrid  from "../component/product/ProductGrid";
import Swal from "sweetalert2";
import { fetchProducts, fetchFeaturedProducts, fetchCheckStock } from "../service/productApi"; // API call
const HomePage = () =>{
    const [products, setProducts] = useState([]);
    const [featuredProducts,setFeaturedProducts] = useState([]);

    useEffect(()=> {
        const loadProducts = async () => {
            try {
                const [allProducts, featured] = await Promise.all([
                    fetchProducts(), // Call API get all product
                    fetchFeaturedProducts() //Call API get featured products
                ]);

                setProducts(allProducts);
                setFeaturedProducts(featured);
                
            }catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            }
        }; 
        loadProducts();  
        // console.log("Featured Products:", featuredProducts);
        // console.log("All Products:", products);
    },[]);


    const handleAddToCart = async (product) => {
        try{
            const maxQuantity = await fetchCheckStock(product.id);
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.findIndex((item) => item.productId === product.id);
            const maxAvailbleQuantity =  (existingProduct!== -1) ? maxQuantity - cart[existingProduct].quantity : maxQuantity;
           
            if(maxAvailbleQuantity <= 0){
                Swal.fire({
                    icon: "warning",
                    title: "Không thể thêm sản phẩm!",
                    text: `Số lượng sản phẩm trong giỏ hàng đã tối đa.`,
                    position: "bottom-end",
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                return; 
            }
            if (existingProduct !== -1) {
                cart[existingProduct].quantity += 1;
            } else {
                cart.push({ productId: product.id, quantity: 1 });
            }
            // Lưu lại giỏ hàng mới vào LocalStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            Swal.fire({
                title: "Thành công!",
                text: "Sản phẩm đã được thêm vào giỏ hàng.",
                icon: "success",
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            console.log("Đã thêm vào giỏ:", product);
        }catch (error) {
            console.error("Lỗi khi kiểm tra tồn kho:", error);
            Swal.fire({
                icon: "warning",
                title: "Lỗi khi kiểm tra tồn kho!",
                text: `Lỗi khi kiểm tra tồn kho, vui lòng thử lại.`,
            });
        }
    };

    return (
        <>
            <Header />
            <main className="home-container ">  
                <div className="categories-wrapper">
                    <Categories />
                </div>
                <div className=" ml-[230px] md:ml-[180px] sm:ml-[120px] 
                                xs:ml-[80px] min-[360px]:ml-[60px] w-[calc(100%-260px)] md:w-[calc(100%-250px)] 
                                sm:w-[calc(100%-180px)] xs:w-[calc(100%-120px)] min-[360px]:w-[calc(100%-100px)] 
                                flex flex-col gap-3 transition-all duration-300">
                    <div className="banner-wrapper">
                        <Banner />
                    </div>
                    {/* Sản phẩm nổi bật */}
                    <section className="featured-products-section">
                        <FeaturedProducts products={featuredProducts} onAddToCart={handleAddToCart} />
                    </section>

                    {/* Sản phẩm dạng lưới */}
                    <section className="product-grid-section">
                        <h2 className="text-gray-600 text-[23px] text-left font-bold pl-9 mt-2 mb-4">Tất cả sản phẩm</h2>
                        <ProductGrid products={products} onAddToCart={handleAddToCart}/>
                    </section>  
                </div>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;