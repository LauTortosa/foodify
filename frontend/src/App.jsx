import React from 'react';
import MyRoutes from './routes';
import Navbar from './components/Navbar'; 
import HeaderComponent from './components/HeaderComponent';

const App = () => {
  return (
    <div className="flex flex-col h-screen"> 
      <HeaderComponent/>
      <div className="flex flex-1"> 
        <Navbar /> 
        <div className="flex-1"> 
          <MyRoutes /> 
        </div>
      </div>
    </div>
  );
};

export default App;
