import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ keyword, setKeyword, handleSearch}) =>{
    return (
        <form onSubmit={handleSearch} className="relative w-4/11"> 
            <div className="relative">
            <input
                type="text"
                placeholder="Tìm kiếm trái cây..."
                className="w-full px-4 py-2 pl-10 rounded border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            </div>
        </form>
    );

};

export default SearchBar;