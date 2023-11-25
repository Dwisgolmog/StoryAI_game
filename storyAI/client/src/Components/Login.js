import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginState } from "../store";

function Login() {
    let navigate = useNavigate();

    //let isLogin = useSelector((state)=> state)
    let dispatch = useDispatch();

    const [errorMs,setErrorMs] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogIn = ()=>{
        if(!email && !password){
            setErrorMs("전부 입력해주십시오!");
        }

        axios.post("http://localhost:8080/users/LogIn",
            {email,password},
            {withCredentials:true}
            )
        .then((result)=>{
            if(result.status === 200){
                console.log(result);
                dispatch(changeLoginState(true));
                alert("로그인 완료!");
                navigate('/');
            }else{
                
            }
        })
        .catch((e)=>{
            console.log("/User-logIn post 요류 발생!");
            if(e.response.status == 404){
                alert("아이디 또는 비밀번호가 틀립니다!");
            }else{
                console.log(e);
            }
        })
    }

    //로그인한 유저의 닉네임을 가져옴
    // const getSession = ()=>{
    //     if (loading) return;

    //     setLoading(true); 

    //     axios.get("http://localhost:8080/users",
    //         {withCredentials:true}
    //     )
    //     .then((result)=>{
    //         console.log(result.data);
    //         setLoading(false); 
    //     })
    //     .catch((e)=>{
    //         console.log('get Session 요청 실패:'+e);
    //         setLoading(false); 
    //     })
    // }

    //현재 로그인된 세션을 삭제시킴
    // const hadnleLogout = () =>{
    //     axios.get("http://localhost:8080/users/Logout",
    //         {withCredentials:true}
    //     )
    //     .then((result)=>{
    //         dispatch(changeLoginState(false));
    //         console.log(result.data);
    //         alert("로그아웃이 되었습니다!");
    //     })
    //     .catch((e)=>{
    //         console.log("/users/Logout post 오류발생:"+e);
    //     })
    // }

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
                <div className="py-8">
                    <img width="150" className="-mt-10" src="/img/WhiteLogo.png" />
                </div>
                <input onChange={(e)=>{
                    setEmail(()=>e.target.value);
                }} className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="E-Mail" />


                <div className="flex flex-col space-y-1">
                    <input type={'password'} onChange={(e)=>{
                        setPassword(()=>e.target.value);
                    }} className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Password" />
                    <br />
                    {errorMs && <p className="text-red-500 font-bold">{errorMs}</p>}
                </div>

                {/* <button onClick={()=>{
                    getSession();
                }}>
                    Get Session
                </button>
                <button onClick={()=>{
                    hadnleLogout();
                }}>
                    Logout
                </button> */}
                <div className="flex flex-col space-y-5 w-full">
                    <button onClick={()=>{
                        handleLogIn();
                    }} className="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">Log in</button>
                    <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
                        <div className="-mt-1 font-bod bg-white px-5 absolute">Or</div>
                    </div>
                    <Link to="/SingUp"><button className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200">Sign Up</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Login