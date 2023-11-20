import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SingUp() {
    let navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [errorMs,setErrorMs] = useState();

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

    useEffect(() => {
        if (emailRegEx.test(email) && passwordRegEx.test(password) && name);
      }, [email, password, name]);

    const handleSinUp = async() => {
        if(!email && !password && !name){
            return setErrorMs("입력이 잘못 되었습니다!! 다시 한번 확인해주세요.");
        }else{
            await axios.post("http://localhost:8080/users/SignUp",{
                email,
                password,
                name    
            })  
            .then((result)=>{
                console.log(result);
                alert('회원가입 완료');
                navigate('/login');
            })
            .catch((e)=>{
                console.log("/SignUp 페이지 post 요청 오류");
                console.log(e);
            })
        }
    }    


    return (
        <div class="min-h-screen flex justify-center items-center bg-white">
            <div class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
                <div class="py-8">
                    <img width="150" class="-mt-10" src="/img/WhiteLogo.png" />
                </div>

                {/* 위에서 부터 순서대로 이메일,비밀번호,이름 입력 */}
                <input type={'email'} onChange={(e)=>{
                    setEmail(()=>e.target.value);
                }}
                 class="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="E-Mail" />

                <input type={'password'} onChange={(e)=>{
                    setPassword(()=>e.target.value);
                }}
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Password" />

                <input onChange={(e)=>{
                    setName(()=>e.target.value);
                }}
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Name" />
                
                {errorMs && <><br /><p class="text-red-500 font-bold">{errorMs}</p></>}
                <div class="box-content h-10"></div>

                {/* Singup 버튼 */}
                <div class="flex flex-col space-y-5 w-full">
                    <button onClick={()=>{
                        handleSinUp();
                    }}
                    class="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">SingUp</button>
                </div>
            </div>
        </div>
    );
}

export default SingUp