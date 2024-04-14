import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { token } = useAuth();

  return (
      <div>
        {token ? <BrowserRouter><Header/></BrowserRouter> : <Login/>}
      </div>
  );
}

export default App;