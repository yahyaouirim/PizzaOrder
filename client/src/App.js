
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CreatePizza from './components/CreatePizza';
import DisplayAllOrders from './components/DisplayAllOrders';
import Account from './components/Account';
import FavoritePizza from './components/FavoritePizza';
import RandomPizza from './components/RandomPizza';
const LightTheme = {
  background: '#fff',
  text: '#333',
};

const DarkTheme = {
  background: '#333',
  text: '#fff',
};

const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
`;

function App() {

  const [theme, setTheme] = useState(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : LightTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme === LightTheme ? DarkTheme : LightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    // Apply the current theme on initial render
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToggleButton className='btn btn-outline-primary' onClick={toggleTheme}>
          {theme === LightTheme ? 'Dark' : 'Light'}
        </ToggleButton>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Dashboard/>} />
            <Route path='/user/craftPizza' element={<CreatePizza/>} />
            <Route path='/pizza/allOrders/:id' element={<DisplayAllOrders  />} />
            <Route path='/user/account/:id' element={<Account />} />
            <Route path ='/pizza/favorite/:id' element ={<FavoritePizza />} />
            <Route path ='/pizza/random/:id' element={<RandomPizza />} />
          </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
