import {fetchCategories } from "../service/categoryApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
const Categories = () => {
   const [categories, setCategories] = useState ([]);

    const navigate = useNavigate();
    const handleClick = (categoryId) => {
    navigate(`/search?categoryId=${categoryId}`);
  };

    useEffect(() => {
        const fetchData = async () => {
          try {
              const categoryRes = await fetchCategories();
              setCategories(categoryRes);
          } catch (error) {
              console.error("Lỗi khi fetch dữ liệu phân loại:", error);
          } 
        };

        fetchData();
    }, []);




    return (
      <div className="fixed left-0 top-0 h-screen bg-white p-[100px_10px_20px_10px] 
                flex flex-col gap-[13px] 
                w-[250px] md:w-[240px] sm:w-[180px] xs:w-[160px] min-[360px]:w-[100px] 
                transition-all duration-300 shadow-md z-30 mt-2" >
        <h2 className="text-white px-2 py-2.5  flex items-center justify-center font-bold bg-green-500">DANH MỤC SẢN PHẨM</h2>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="menu-button"
            onClick={() => handleClick(cat.id)} > {cat.name}
          </button>
        ))}

      </div>
    );
  };
  
  export default Categories;