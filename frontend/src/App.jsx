import React from 'react';
import MyRoutes from './routes';
import Navbar from './components/Navbar'; 
import HeaderComponent from './components/HeaderComponent';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <HeaderComponent/>
      <div className="flex flex-1 flex-col lg:flex-row"> 
      <div className="flex-shrink-0 w-full lg:w-1/4 bg-gray-300"> 
          <Navbar />
        </div>
        <div className="flex-1 p-4"> 
          <MyRoutes /> 
        </div>
      </div>
    </div>
  );
};

export default App;
