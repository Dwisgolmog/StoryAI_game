import '../App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Banner(){
    return(
        <>
            <img className="bannerPostion" src="/img/banner.png" style={{width: '100%'}} alt='banner'></img>
            <Link to='/learn'>
                <Button 
                className='bannerBtn' 
                variant="contained" 
                color='error' 
                sx={{ color: 'black', backgroundColor: 'white'}}
                style={{fontWeight:'bolder',fontSize:'large'}}>
                    Learn About Us
                </Button>            
            </Link>
        </>    
    );
}

export default Banner