import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MyRoutes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <MyRoutes />
    </div>
  );
};

export default App;
