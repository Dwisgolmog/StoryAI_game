import { Box } from "@mui/material";
import { Container } from "@mui/system";
import '../App.css';
import {Grid} from "@mui/material";

function Footer() {
    return (
        <>
            <Box sx={{
                    width: '100%',
                    height: '20vw',
                    backgroundColor: 'black',
                }}>
                   
                        <div style={{textAlign: 'center',color: 'white'}}>
                            <img  src="/img/BlackLogo.png" style={{width:'11vw', height:'10vw' }}/>
                            <Grid container>
                                <Grid item xs={4}>
                                    <p style={{fontWeight:'bolder'}}>기획,디자인</p>
                                    mikyholee@naver.com
                                </Grid>
                                <Grid item xs={4}>
                                    <p style={{fontWeight:'bolder'}}>개발자</p>
                                    github.com/dwisgolmog
                                </Grid>
                                <Grid item xs={4}>
                                    <p style={{fontWeight:'bolder'}}>개발자</p>
                                    github.com/dnwn1211
                                </Grid>
                            </Grid>
                        </div>
                    
            </Box>
        </>
    );
}

export default Footer;