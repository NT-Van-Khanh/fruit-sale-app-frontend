import React, {useEffect, useState} from "react";
import Header  from "../component/Header";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import Categories  from "../component/Categories";
import FeaturedProducts  from "../component/FeaturedProducts";
import ProductGrid  from "../component/ProductGrid";
import Swal from "sweetalert2";
import { fetchProducts, fetchFeaturedProducts } from "../service/api"; // API call
const HomePage = () =>{
    const [products, setProducts] = useState([]);
    const [featuredProducts,setFeaturedProducts] = useState([]);

    useEffect(()=> {
        const loadProducts = async () => {
            try {
                const [allProducts, featured] = await Promise.all([
                    fetchProducts(), // Gọi API 1
                    fetchFeaturedProducts() // Gọi API 2
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


    const handleAddToCart = (product) => {
        // Lấy danh sách giỏ hàng hiện tại từ LocalStorage (nếu có)
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Kiểm tra nếu sản phẩm đã có trong giỏ hàng, thì tăng số lượng
        const existingProductIndex = cart.findIndex((item) => item.productId === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
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
            timer: 2000,
            timerProgressBar: true,
        });
        console.log("Đã thêm vào giỏ:", product);
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
                        {/* <h2>Sản phẩm nổi bật</h2> */}
                        <FeaturedProducts products={featuredProducts} onAddToCart={handleAddToCart} />
                    </section>

                    {/* Sản phẩm dạng lưới */}
                    <section className="product-grid-section">
                        {/* <h2>Sản phẩm mới nhất</h2> */}
                        <ProductGrid products={products} onAddToCart={handleAddToCart}/>
                    </section>  
                    {/* Danh sách sản phẩm với nút "Xem thêm" */}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;