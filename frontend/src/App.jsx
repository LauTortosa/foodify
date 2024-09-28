import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MyRoutes from './routes';
import LogoutComponent from './components/Log/LogoutComponent';
import useAuthenticatedUser from './hooks/useAuthenticatedUser';

const App = () => {
  const username = useAuthenticatedUser();

  return (
    <div>
      <div className="flex justify-between items-center mt-10 px-4">
      <h1 className="text-center text-4xl font-bold mt-10">FOODIFY PLANNER</h1>
        {username && (
          <div className="ml-auto font-bold mt-10">
            <p>Sesión iniciada con: {username}</p>
            <LogoutComponent />
            </div>
        )}
      </div>
      <MyRoutes />
    </div>
  );
};

export default App;
