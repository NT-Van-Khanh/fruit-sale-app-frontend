import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import SearchBar from "../SearchBar";
const Header = () => {
    const params = new URLSearchParams(location.search);
    const [keyword, setKeyword] = useState(params.get("keyword") || "");
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 
                        bg-green-500 px-4 py-2 text-white 
                        flex justify-between items-center shadow-md  box-border">
            <h1 className="md:text-[42px] text-[28px] font-bold whitespace-nowrap overflow-hidden"><a href="/">FruitShop</a></h1>
            <SearchBar 
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch} />
            <div className="flex gap-4">
                <Link to="/cart" className="text-white hover:text-gray-500">
                    <ShoppingCartIcon className="icon w-6 h-6"  />
                </Link>
                <Link to="/login" className="hover:text-blue-500">
                   <UserIcon className="icon w-6 h-6" />
                </Link> 
            </div>
        </header>
    );
};

export default Header;