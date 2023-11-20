import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import { Container } from '@mui/system';
import Content from './Components/conent';
import Footer from './Components/Footer';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Login';
import SingUp from './Components/SignUp';
import Game from './page/Game';

function App() {
  return (
    <div className='bgColor'>

      <Routes>
        <Route path='/' element={
          <>
            <NavBar bgColor='black'></NavBar>
            <Banner></Banner>
            <Container fixed>
              <Content></Content>
            </Container>
          </>}> 
        </Route>

        <Route path='/game' element={<>
          <NavBar bgColor='white'></NavBar>
          <Game></Game>
        </>} />

        <Route path='/login' element={<Login></Login>} />
        <Route path='/SingUp' element={<SingUp></SingUp>} />

        <Route path='*' element={<div>404error! 없는 페이지 입니다.</div>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;