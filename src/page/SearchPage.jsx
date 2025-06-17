import React, { useState, useEffect, useMemo, useRef,useCallback } from "react";
import { useLocation } from 'react-router-dom';

import Header  from "../component/header/Header";
import Footer  from "../component/Footer";
import ProductGrid from "../component/product/ProductGrid";
import Swal  from "sweetalert2";
import {fetchSearchProducts ,fetchCheckStock} from "../service/productApi";
import ProductFilter  from "../component/product/ProductFilter";
const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const location = useLocation();
    const keyword = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get("keyword") || "";
    }, [location.search]);

    const [searchProducts, setSearchProducts] = useState ([]);
    const [hasMore, setHasMore] = useState(true);
    const pageRef = useRef(0);
    const totalPagesRef = useRef(1);
    
        const [filterParams, setFilterParams] = useState(null);

        useEffect(() => {
            if (filterParams) {
                pageRef.current = 0;
                totalPagesRef.current = 1;
                setSearchProducts([]);
                setHasMore(true);
                fetchProducts(0, true, filterParams);
            }
        }, [filterParams]);

        const handleFilter = (filterData) => {
            setFilterParams(filterData);
        };
    const fetchProducts = async (currentPage, isFirstLoad = false, filters = {}) => {
        setLoading(true);
        try {
            const pageRequest = {
                page: currentPage,
                size: 10,
                sortBy: "id",
                direction: "asc",
            };

            const dataResponse = await fetchSearchProducts(
                keyword,
                filters.category || null,
                filters.brand || null,
                filters.minPrice ?? null,
                filters.maxPrice ?? null,
                pageRequest
            );

            const newData = dataResponse.data;
            totalPagesRef.current = dataResponse.totalPages;

            setSearchProducts((prev) =>
                isFirstLoad ? newData : [...prev, ...newData.filter(
                (p) => !prev.some((item) => item.id === p.id)
                )]
            );

            setHasMore(currentPage + 1 < dataResponse.totalPages);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách sản phẩm.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        pageRef.current = 0;
        totalPagesRef.current = 1;
    
        setSearchProducts([]);
        setHasMore(true);
        if (keyword) {
            fetchProducts(pageRef.current, true);
        }
    }, [keyword]);

    const handleScroll = useCallback(() => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (
            nearBottom &&
            !loading &&
            hasMore &&
            pageRef.current + 1 < totalPagesRef.current
        ) {
            pageRef.current += 1;
            fetchProducts(pageRef.current);
        }
    }, [hasMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

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
                    <ProductFilter onFilter={handleFilter}/>
                </div>
                <div className="w-[calc(100%-360px)] md:w-[calc(100%-350px)] 
                                sm:w-[calc(100%-280px)] xs:w-[calc(100%-220px)] min-[360px]:w-[calc(100%-200px)] 
                                flex flex-col gap-3 transition-all duration-300">
                    {/* Sản phẩm dạng lưới */}
                    <section className="product-grid-section">
                        <h2 className="text-gray-600 text-[23px] text-left font-bold pl-9 mt-2 mb-4">Kết quả tìm kiếm</h2>
                        <ProductGrid products={searchProducts} onAddToCart={handleAddToCart}/>
                    </section>  
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SearchPage;