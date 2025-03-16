const Categories = () => {
    const categories = ["Tất cả", "Trái cây trong nước", "Trái cây nhập khẩu", "SẢN PHẨM HOT"];
  
    return (
      <div className="fixed left-0 top-0 h-screen bg-white p-[100px_10px_20px_10px] 
                flex flex-col gap-[13px] 
                w-[250px] md:w-[240px] sm:w-[180px] xs:w-[160px] min-[360px]:w-[100px] 
                transition-all duration-300 shadow-md z-30 mt-2" >
        <h2 className="text-gray-600 text-left pl-2 pb-2 font-bold">DANH MỤC SẢN PHẨM</h2>
        {categories.map((cat) => (
          <button key={cat} className="menu-button ">
            {cat}
          </button>
        ))}
      </div>
    );
  };
  
  export default Categories;