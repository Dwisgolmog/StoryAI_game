import { React,useState,useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import '../App.css';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';

function NavBar({bgColor}) {
    const [color,setColor] = useState(bgColor);

    useEffect(()=>{
        if(color=='white'){
            setColor('black');
        }else{
            setColor('rgb(240, 240, 240)');
        }
    },[bgColor])

    return (
        <>
            <Container maxWidth="xl" sx={{mt:0, pt: 2}} position="static" color='default' className='navBar' style={{backgroundColor:color,width:'100%'}}>
                    <Toolbar disableGutters>
                        <Grid container item xs={8} className='leftNav' style={{color:bgColor}}>
                            <Grid item xs={4}>
                                <NavLink to={'/'}>
                                {
                                    bgColor == 'black' ? <img src='/img/WhiteLogo.png' />
                                    : <img src='/img/WhiteLogo2.png' style={{width:'8vw', height:'5vw' }}></img>
                                }
                                </NavLink>
                            </Grid>
                            <Grid item xs={4}>
                                Learn About Us
                            </Grid>
                            <Grid item xs={4}>
                                Game Select
                            </Grid>
                        </Grid>

                        <Grid container item xs={4} className='rightNav' style={{color:bgColor}}>
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