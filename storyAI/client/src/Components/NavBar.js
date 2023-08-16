import { React } from 'react';
import { Container, Grid } from '@mui/material';
import '../App.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material';

function NavBar() {
    return (
        <>
            <Container position="static" color='default' className='navBar'>
                    <Toolbar disableGutters>
                        <Grid container item xs={8} className='leftNav'>
                            <Grid item xs={4}>
                                <img src='/img/WhiteLogo.png'></img>
                            </Grid>
                            <Grid item xs={4}>
                                Learn About Us
                            </Grid>
                            <Grid item xs={4}>
                                Game Select
                            </Grid>
                        </Grid>

                        <Grid container item xs={4} className='rightNav'>
                            <Grid item xs={4}>
                                Log In
                            </Grid>
                            <Grid item xs={4}>
                                Save
                            </Grid>
                            <Grid item xs={4}>
                                Load
                            </Grid>
                        </Grid>
                    </Toolbar>
    
            </Container>
        </>
    );
}

export default NavBar