import './App.css';
import Login from './components/pages/Login';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  return (
    <div>
     {isLoggedIn ? <BrowserRouter>
        <Header/>
      </BrowserRouter> : <Login/>}
    </div> 
  );
}

export default App;
