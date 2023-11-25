import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios 추가

function NavBar() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        // 세션을 확인하고 isLogin 값을 업데이트
        const checkSession = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users", { withCredentials: true });

                if (response.status === 200) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                console.error("세션 확인 중 오류:", error);
            }
        };

        checkSession();
    }, []);

    const handleLogoClick = () => {
        // 메인 화면으로 이동
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            console.log("로그아웃 axios 전");
            const response = await axios.get("http://localhost:8080/users/Logout", { withCredentials: true });
            console.log("로그아웃 axios 후", response);
    
            if (response.status === 200) {
                setIsLogin(false);
                navigate('/');
            } else {
                console.error("로그아웃 실패:", response.statusText);
            }
        } catch (error) {
            console.error("로그아웃 중 오류:", error);
        }
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
