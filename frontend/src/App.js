import './App.css';
import { useEffect} from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React from 'react'
import webFont from 'webfontloader'
import Header from './Component/Layout/Header/Header';
import Footer from './Component/Layout/Footer/Footer';
import Home from './Component/Home/Home';




function App() {

  useEffect(() => {
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  }, [])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
