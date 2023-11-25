import { Box } from "@mui/material";
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
                        <div style={{ textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <img src="/img/BlackLogo.png" alt='Logo' style={{ width: '11vw', height: '10vw' }} />
                        </div>
                        <Grid container>
                            <Grid item xs={4}>
                                <p style={{ fontWeight: 'bolder' }}>디자인</p>
                                mikyholee@naver.com
                            </Grid>
                            <Grid item xs={4}>
                                <p style={{ fontWeight: 'bolder' }}>개발자</p>
                                github.com/dwisgolmog
                            </Grid>
                            <Grid item xs={4}>
                                <p style={{ fontWeight: 'bolder' }}>개발자</p>
                                github.com/dnwn3027
                            </Grid>
                        </Grid>
                    </div>
            </Box>
        </>
    );
}

export default Footer;