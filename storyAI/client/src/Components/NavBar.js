import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavBar() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const fetchLoginStatus = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/users", { withCredentials: true });

            console.log("Session Check Response:", response);

            if (response.data && response.data.user) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        } catch (error) {
            console.error("세션 확인 중 오류:", error);
        }
    }, []); // Empty dependency array, as there are no external dependencies

    useEffect(() => {
        fetchLoginStatus();
    }, [fetchLoginStatus]);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users/logout", { withCredentials: false });
    
            // Check if the response indicates successful logout
            if (response.data && response.data.message === 'logout success') {
                setIsLogin(false);
                navigate('/');
                console.log("logout~");
            } else {
                console.error("로그아웃 실패: 사용자 정보가 남아 있음");
            }
        } catch (error) {
            console.error("로그아웃 중 오류:", error);
        }
    };
    
    

    return (
        <div className="navLogo flex items-center bg-white-800 text-black p-4">
            <div className="flex items-center" onClick={handleLogoClick}>
                <img src='/img/WhiteLogo.png' className="w-29 h-16" alt="Logo" />
            </div>
            <div className="flex ml-40">
                <div className='mr-20'>
                    <a href='/game' className="nav-link">AboutLearnUS</a>
                </div>
                <div className='mr-20'>
                    <a href='/game' className="nav-link">GameSelect</a>
                </div>
                <div className='mr-20'>
                    {isLogin ? (
                        <Link to='/' onClick={handleLogout} className="nav-link">Logout</Link>
                    ) : (
                        <Link to='/login' className="nav-link">Login</Link>
                    )}
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
