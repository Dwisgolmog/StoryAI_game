import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Canvas } from 'react-three-fiber';
import ThreeDmodel from './threeDmodel';

function Learn() {
    const [displayText, setDisplayText] = useState('');
    const originalText = ' 환영합니다!! 저희 StoryAI를 방문해주셔서 감사합니다. 저희 StoryAi는 chatGPT를 사용하여 만드는 TRPG 스토리텔링형 게임입니다. 자신만의 이야기를 만들면서 몰입감을 높이세요!!';

    useEffect(() => {
        let currentIndex = 0;

        const typingEffect = () => {
            if (currentIndex < originalText.length) {
                setDisplayText((prevText) => prevText + originalText[currentIndex]);
                currentIndex += 1;
                setTimeout(typingEffect, 120); // 타이핑 속도 조절
            }
        };

        const typingTimeout = setTimeout(typingEffect, 100); // 첫 번째 호출

        // 추가된 부분: currentIndex가 originalText.length에 도달하면 clearTimeout을 통해 타이머 종료
        const cleanup = () => {
            clearTimeout(typingTimeout);
        };

        return cleanup;
    }, []); // 컴포넌트 마운트 시에만 실행

    // 페이지 새로고침 시 초기화를 위한 상태 추가
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        // 페이지가 초기 렌더링될 때에는 텍스트 초기화
        if (initialRender) {
            setDisplayText('');
            setInitialRender(false);
        }
    }, [initialRender]);

    return (
        <div>
            <div className='learn'>
                <NavBar />
            </div>
            <div
                className='bg-cover bg-center'
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100vh',
                    backgroundImage: 'url("/img/bg1.jpg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Canvas>
                    <ambientLight intensity={0.5}/>
                    <spotLight position={[10,10,10]} angle={0.15} penumbra={1}/>
                    <ThreeDmodel/>
                </Canvas>
                <div className='mentdiv' style={{width:'300px',height:'100px'}}>
                    <p className='ment'>{displayText}</p>
                </div>
            </div>
        </div>
    );
}

export default Learn;
