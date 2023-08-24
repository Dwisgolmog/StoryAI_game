import { Container, padding } from "@mui/system";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Button,createTheme,ThemeProvider } from "@mui/material";
import axios from "axios";
import { React,Fragment,useEffect,useState } from "react";

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
    const[translate,setTranslate] = useState();
    const[inputText,setInputText] = useState();
    const[reload,setReload] = useState(0);

    // /server/gpt 라는 주소에 get 요청을 하여 gpt의 답변을 가져옴
    useEffect(()=>{
        axios.get('http://localhost:8080/server/gpt')
        .then(result=>{
            console.log(result.data);

            let copy = [...result.data];
            console.log("copy:"+JSON.stringify(copy));
            setData(copy);
            //setTranslate(JSON.stringify(copy)); //번역된 내용을 저장할 변수
        }).catch(e=>{
            console.log('axios 에러발생!!:'+e);
        })
    },[reload])

    // data값의 변동(응답 받음)이 발생하면 translate값을 papgo api에게 post 요청하여 보내어 번역된 값을 받길 원함
    // useEffect(()=>{
    //     if(translate != null){
    //         axios.post('http://localhost:8080/server/translate',{textToTranslate:translate})
    //         .then((response)=>{
    //             console.log(JSON.stringify(response.data));
    //             console.log('============================');
    //             console.log(response.data);
    //             let transCopy = [...response.data];
    //             // setTranslate(JSON.parse(transCopy));
    //         })
    //         .catch(e=>{
    //             console.log('/server/translate 클라이언트 post error!:'+e);
    //         })
    //     }
    // },[data])

    //input값을 저장하는 함수
    const handleChange = e=>{
        setInputText(e.target.value);
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <Container fixed sx={{mb:7,mt:7}}>
                    <Grid container>
                        <Grid item xs={5.8}>
                            <Box sx={{
                            height:'35vw',
                            bgcolor:'white',
                            border:'2px solid gray',
                            p:2,
                            overflow: "hidden",
                            overflowY: "scroll",
                            }} >
                                {
                                    data[1] != null ?
                                    data.map((item,index)=>(
                                        index >=2 &&
                                        <p key={index}>{item.content.split('\n').map((text, index) => (
                                            <Fragment key={index}>
                                                {text}
                                                <br />
                                            </Fragment>
                                        ))}</p>
                                    ))
                                    // 데이터 바인딩을 하기 위한 몸부림

                                    // translate.map((item, index) => (
                                    //     <div key={index}>
                                    //       <h3>{item['역할']}</h3>
                                    //       <p>{item['내용']}</p>
                                    //     </div>
                                    //   ))
                                    // translate[1] != null ?
                                    // translate.map((item,index)=>(
                                    //     index >= 2 &&
                                    //     <p key={index}>{item.content.map((text, index) => (
                                    //         <Fragment key={index}>
                                    //             {text}
                                    //             <br />
                                    //         </Fragment>
                                    //     ))}</p>
                                    // ))
                                    : null
                                }
                                

                            </Box>
                        </Grid>
                        <Grid item xs={0.4} />
                        <Grid item xs={5.8}>
                            <Box sx={{
                                height: '35vw',
                                bgcolor: 'white',
                                border: '2px solid gray'
                            }}>
                                {/* 이미지 더미 수정 요망 */}
                                <img src="/img/contentimg2.png" style={{textAlign:'center',width:'100%',height:'100%'}}></img>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                            <Grid item sx={{mt:4}} xs={8.6}>
                                <input onChange={handleChange} style={{width:'100%',height:'5vw'}}></input>
                            </Grid>
                            <Grid item xs={0.4}/>
                            <Grid item sx={{mt:4}} xs={3}>
                                {/* button을 누를시 답변을 post 요청하고 setReload로 페이지를 재랜더링함 */}
                                <Button onClick={()=>{
                                    axios.post('http://localhost:8080/server/gpt/send',{inputText:inputText})
                                    .then((response)=>{
                                        console.log("/gpt/send response:"+JSON.stringify(response));
                                        setReload(reload+1);
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
        </>
    );
}

export default Game