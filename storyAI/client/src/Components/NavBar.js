import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        // 메인 화면으로 이동
        navigate('/');
    };

    return (
        <div className="navLogo flex flex-col md:flex-row items-center bg-white-800 text-black p-4">
            <div className="flex items-center" onClick={handleLogoClick}>
                <img src='/img/WhiteLogo.png' className="w-29 h-16" alt="Logo" />
            </div>
            <div className="flex ml-40">
                <div className='mr-20'>
                    <a href='/game' className="nav-link">About Learn US</a>
                </div>
                <div className='mr-20'>
                    <a href='/game' className="nav-link">Game Select</a>
                </div>
                <div className='mr-20'>
                    <Link to='/Login' className="nav-link">Login</Link>
                </div>
                <div className='mr-20'>
                    <a href='/save' className="nav-link">Save</a>
                </div>
                <div className='mr-20'>
                    <a href='/load' className="nav-link">Load</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
