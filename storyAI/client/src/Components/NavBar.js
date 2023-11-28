import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavBar(props) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('');
    const navColor = props.bgColor;

    const fetchLoginStatus = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/users", { withCredentials: true });

            console.log("Session Check Response:", response);

            if (response.data && response.data.user) {
                setIsLogin(true);
                setUserName(response.data.user.userName); // 사용자 이름 업데이트
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

    // 클라이언트에서 로그아웃 성공 시 상태 업데이트 코드
const handleLogout = async () => {
    try {
        const response = await axios.get("http://localhost:8080/users/logout", { withCredentials: false });

        if (response.data && response.data.message === 'logout success') {
            setIsLogin(false);
            setUserName(''); // 사용자 이름 초기화
            console.log("logout~");
        } else {
            console.error("로그아웃 실패: 사용자 정보가 남아 있음");
        }
    } catch (error) {
        console.error("로그아웃 중 오류:", error);
    }
};

    return (
        <div className={`navLogo flex items-center bg-${navColor === 'black' ? 'white-800':'black'} text-${navColor} p-4`}>
            <div className="flex items-center" onClick={handleLogoClick}>
                <img src={navColor === 'black' ? '/img/WhiteLogo.png' : '/img/WhiteLogo2.png'} className="w-29 h-16" alt="Logo" />
            </div>
            <div className="flex ml-40">
                <div className='mr-20'>
                    <Link to='/Learn' className="nav-link">AboutLearnUS</Link>
                </div>
                <div className='mr-20'>
                    <a href='/game' className="nav-link">GameSelect</a>
                </div>
                <div className='mr-20'>
                    <a href='/save' className="nav-link">Save</a>
                </div>
                <div className='mr-20'>
                    <a href='/load' className="nav-link">Load</a>
                </div>
                <div className='flex mr-20 ml-auto'>
                    {isLogin ? (
                        <Link to='/' onClick={handleLogout} className="nav-link">{userName+'님'} Logout</Link>
                    ) : (
                        <Link to='/login' className="nav-link">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
