import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import { Container } from '@mui/system';
import Content from './Components/conent';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Banner></Banner>
      <Container fixed>
        <Content></Content>
      </Container>
      <Footer/>
    </>
  );
}

export default App;