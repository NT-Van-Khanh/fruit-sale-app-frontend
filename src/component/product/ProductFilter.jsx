import React, { useState, useEffect} from "react";
import {fetchBrands } from "../../service/brandApi";
import {fetchCategories } from "../../service/categoryApi";

import PriceRange from '../PriceRange';
const ProductFilter = ({ onFilter }) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState ([]);
    const [brands, setBrands] = useState ([]);
    const priceSortOptions = [
        { label: 'Giá tăng dần', value: 'asc' },
        { label: 'Giá giảm dần', value: 'desc' }
    ];

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    const handleSubmit = () => {
        const filterData = {
        priceSort,
        minPrice: values[0],
        maxPrice: values[1],
        category: selectedCategory,
        brand: selectedBrand,
        };
        console.log("filterData",filterData);
        onFilter && onFilter(filterData); // gọi hàm được truyền từ SearchPage
    };



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const categoryRes = await fetchCategories();
                const brandRes = await fetchBrands();
                setCategories(categoryRes);
                setBrands(brandRes);
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [priceSort, setPriceSort] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000000);
    const MIN = 0; 
    const MAX = 5000000;
    const [values, setValues] = useState([minPrice, maxPrice]);
    return (
    <div className="fixed left-0 top-0 h-screen bg-white p-[100px_10px_20px_10px] 
                flex flex-col gap-[13px] 
                w-[350px] md:w-[340px] sm:w-[280px] xs:w-[260px] min-[260px]:w-[100px] 
                transition-all duration-300 shadow-md z-30 mt-2">
        <h2 className="text-gray-600 px-2 py-2 flex items-center justify-center font-bold bg-green-200">TÙY CHỌN LỌC</h2>
        <div className="flex items-center">
            <h3 className="min-w-[80px] pl-1 text-left">Sắp xếp:</h3>
            <select 
                className="w-full px-4 py-2 bg-white text-green-700 text-base  
                shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150">
                {priceSortOptions.map((option) => (
                <option
                    key={option.value}
                    value={option.label}
                    className={`menu-button ${priceSort === option.value ? 'bg-green-100 text-green-700 font-semibold' : ''}`}
                    onClick={() => setPriceSort(option.value)}>
                    {option.label}
                </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col">
            <h3 className="text-left pl-1 pb-1">Phân loại:</h3>
            <select onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 mb-2 bg-white text-green-700 text-base  
                shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150">
                <option key={0} value="">Tất cả</option>
                {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col">
            <h3 className="text-left pl-1 pb-1">Nhà cung cấp:</h3>
            <select onChange={(e) => setSelectedBrand(e.target.value)}
                 className="w-full px-4 py-2 mb-2 bg-white text-green-700 text-base  
                shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150">
                <option key={0} value="">Tất cả</option>
                {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                    {brand.name}
                </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col">
        <h3 className="text-left pl-1 pb-1">Khoảng giá</h3>
            <PriceRange  values={values} 
                        setValues={setValues} 
                        MIN = {MIN} 
                        MAX = {MAX} />
        </div>
        <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md 
                        hover:bg-green-600 w-full" 
                        onClick={handleSubmit}>LỌC SẢN PHẨM </button>
    </div>
    );
};

 export default ProductFilter;
