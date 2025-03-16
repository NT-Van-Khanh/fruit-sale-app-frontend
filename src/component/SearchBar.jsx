import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () =>{
    const [query, setQuery] = useState("");
    const [searchResults, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleSearch = async (e) =>{
        const value = e.target.value.toLowerCase();
        setQuery(value);

        if (value.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?query=${value}`);
            const data = await response.json();
            setResults(data);
          } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
          }
          setLoading(false);
    };

    return (
        <div className="relative w-98">
            <div className="relative">
            <input
                type="text"
                placeholder="Tìm kiếm trái cây..."
                className="w-full px-4 py-2 pl-10 rounded border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            </div>

            {loading && <p className="text-gray-500 text-sm mt-2">Đang tìm kiếm...</p>} 
            {searchResults.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 mt-1 w-full max-h-60 
                            overflow-auto rounded shadow-lg">
                {searchResults.map((product) => (
                <li key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                    {product.name}
                </li>
                ))}
            </ul>
            )}
        </div>
    );

};

export default SearchBar;