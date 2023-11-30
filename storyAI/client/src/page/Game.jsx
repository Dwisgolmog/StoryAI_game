import { Container, padding } from "@mui/system";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Button,createTheme,ThemeProvider, useScrollTrigger } from "@mui/material";
import axios from "axios";
import { React,Fragment,useEffect,useState, useRef } from "react";
import { Canvas } from 'react-three-fiber';
import ThreeDmodel from '../Components/threeDmodel';

let theme = createTheme({});

theme = createTheme(theme, {
    palette: {
      enter: theme.palette.augmentColor({
        color: {
          main: '#6a6a6a',
        },
        name: 'enter',
      }),
    },
  });
//server 에서 get 요청한 result.data[0].content 의 값을 바인딩하기
function Game(){

    const[data,setData] = useState([]);
    const[inputText,setInputText] = useState('');
    const[reload,setReload] = useState(0);
    const scrollRef = useRef(null);

    // /server/gpt 라는 주소에 get 요청을 하여 gpt의 답변을 가져옴
    useEffect(()=>{
        axios.get('http://localhost:8080/server/gpt')
        .then(result=>{
            console.log(result.data);

            let copy = [...result.data];
            console.log("copy:"+JSON.stringify(copy));
            setData(copy);
        }).catch(e=>{
            console.log('axios 에러발생!!:'+e);
        })
    },[reload])

    useEffect(() => {
        // 스크롤이 자동으로 아래로 내려가도록 처리
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [data]);

    //input값을 저장하는 함수
    const handleChange = e=>{
        setInputText(e.target.value);
    }

    return(
        <div className='bg-cover bg-center'
        style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100vh',
            backgroundImage: 'url("/img/bg2.jpeg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <ThemeProvider theme={theme}>
                <Container fixed sx={{mb:7,mt:7}}>
                    <Grid container>
                        <Grid item xs={5.8}>
                            <Box
                                ref={scrollRef}
                                sx={{
                                    height:'35vw',
                                    bgcolor:'white',
                                    border:'2px solid gray',
                                    p:2,
                                    overflow: "hidden",
                                    overflowY: "scroll",
                            }} >
                                <p>
                                    [Main story]<br />
                                    플레이어는 도시 중앙에 위치한 10층 건물에 있습니다. 물도 좀비로 가득 차 있습니다.
                                    플레이어는 어젯밤에 술을 많이 마셔서 좀비 아포칼립스가 일어나는 것을 눈치채지 못했습니다.
                                    플레이어는 다음날 사무실에서 일어났습니다.
                                </p>
                                {
                                    data[1] != null ?
                                        data.map((item, index) => (
                                            index >= 2 &&
                                            <div>
                                                <p key={index}>
                                                    {item.role === 'user' && '플레이어: '}
                                                    {item.role === 'assistant' && '진행자: '}
                                                    {item.content.split('\n').map((text, index) => (
                                                        <Fragment key={index}>
                                                            {text}
                                                            <br />
                                                        </Fragment>
                                                    ))}
                                                </p>
                                                <br />
                                                <br />
                                            </div>
                                        ))
                                        : null
                                }
                                

                            </Box>
                        </Grid>
                        <Grid item xs={0.4} />
                        <Grid item xs={5.8}>
                                <Canvas camera={{near: 1,far: 100, position : [5,0,7]}}>
                                    <ThreeDmodel />
                                </Canvas>
                        </Grid>
                    </Grid>
                    <Grid container>
                            <Grid item sx={{mt:4}} xs={8.6}>
                                <input onChange={handleChange} style={{width:'100%',height:'5vw'}} value={inputText}></input>
                            </Grid>
                            <Grid item xs={0.4}/>
                            <Grid item sx={{mt:4}} xs={3}>
                                {/* button을 누를시 답변을 post 요청하고 setReload로 페이지를 재랜더링함 */}
                                <Button onClick={()=>{
                                    setInputText('');
                                    axios.post('http://localhost:8080/server/gpt/send',{inputText:inputText})
                                    .then((response)=>{
                                        //console.log("/gpt/send response:"+JSON.stringify(response));
                                        setReload(reload+1);
                                        setInputText('');
                                    }).catch(e=>{
                                        console.log('inputText post error=======>'+e);
                                    })
                                }
                                    //null
                                } variant="contained" color="enter" style={{width:'100%',height:'5vw'}}>Enter</Button>
                            </Grid>
                    </Grid>


                </Container>
            </ThemeProvider>    
        </div>
    );
}

export default Game