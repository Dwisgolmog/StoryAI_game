import { Container, padding } from "@mui/system";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Button,createTheme,ThemeProvider } from "@mui/material";
import axios from "axios";
import { useEffect,useState } from "react";

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

function Game(){

    const[data,setData] = useState();

    useEffect(()=>{
        axios.get('/server/kogpt')
        .then(result=>{
            console.log('axios 결과값:'+result.data);
            setData(result.data);
        }).catch(e=>{
            console.log('axios 에러낫어욤!!:'+e);
        })
    },[])

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
                            p:2
                            }} >
                                {
                                    
                                }
                                <p>
                                    진행자:좀비 아포칼립스에 오신걸 환영합니다.
                                </p>
                                <p>
                                    Data: {data}
                                </p>

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
                                <input style={{width:'100%',height:'5vw'}}></input>
                            </Grid>
                            <Grid item xs={0.4}/>
                            <Grid item sx={{mt:4}} xs={3}>
                                <Button variant="contained" color="enter" style={{width:'100%',height:'5vw'}}>Enter</Button>
                            </Grid>
                    </Grid>


                </Container>
            </ThemeProvider>    
        </>
    );
}

export default Game