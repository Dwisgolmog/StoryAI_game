import '../App.css';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="flex justify-center items-center bg-white-800 text-black p-4">
            <ul className="flex space-x-4">
                <li><img src='/img/WhiteLogo.png' className="w-29 h-16" alt="Logo" /></li>
                <li><a href='#' className="hover:underline py-16">About Learn US</a></li>
                <li><a href='#' className="hover:underline py-16">Game Select</a></li>
                <li><Link to='/Login'className="hover:underline py-16">Login</Link></li>
                <li><a href='#' className="hover:underline py-16">Save</a></li>
                <li><a href='#' className="hover:underline py-16">Load</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
