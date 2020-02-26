import React from 'react';
import './App.css';
import Weather from './components/Weather';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <header>
        <Navbar />
      </header>
      <Weather />
    </div>
  );
}

export default App;
