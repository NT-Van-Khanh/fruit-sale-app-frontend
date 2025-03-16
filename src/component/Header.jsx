import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 
                        bg-green-500 px-4 py-2 text-white 
                        flex justify-between items-center shadow-md">
            <h1 className="text-[42px] font-bold"><a href="/">FruitShop</a></h1>
            <SearchBar/>
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