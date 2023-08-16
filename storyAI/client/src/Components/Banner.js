import '../App.css';
import Button from '@mui/material/Button';

function Banner(){
    return(
        <>
            <img className="bannerPostion" src="/img/banner.png" style={{width: '100%'}}></img>
            <Button className='bannerBtn' variant="contained" color='error' sx={{ color: 'black', backgroundColor: 'white'}}
            style={{fontWeight:'bolder',fontSize:'large'}}
            >Learn About Us</Button>
        </>    
    );
}

export default Banner