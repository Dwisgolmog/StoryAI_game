import '../App.css';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Content(){
    const [conCount] = useState([1,2,3]);

    return(
        <div style={{marginBottom:'10vw'}}>
            <img className='gameSelect' src="/img/gameSelect.png"></img>
            <Grid container>
                {        
                    conCount.map((item,index)=>{
                        return(
                            <Grid item xs={4} key={index} style={{textAlign: 'center'}}>
                                <NavLink to={'/game'}>
                                    <img src={`/img/contentImg${item}.png`} style={{width: '80%'}}/>
                                </NavLink>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    );
}

export default Content