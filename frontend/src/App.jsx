import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MyRoutes from './routes';

const App = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-10">FOODIFY PLANNER</h1>
      <MyRoutes />
    </div>
  );
};

export default App;
