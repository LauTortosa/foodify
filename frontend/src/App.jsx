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
      <div className="navbar bg-base-100">
      <h1 className="text-center text-5xl font-bold mt-10 ml-8">FOODIFY PLANNER</h1>
        {username && (
          <div className="ml-auto font-bold mt-10">
             <div className="form-control mr-8">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
              </div>
              <div className="dropdown dropdown-end mr-8">
                <div tabIndex={0} role="button" className="btn btn-active btn-neutral avatar bg-neutral text-neutral-content w-12 rounded-full">
                  <span className="text-xl">AD</span>
                </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2">
                      <p className='text-lg'>Usuario: {username}</p>
                    <li className='mt-6'><LogoutComponent /></li>
                  </ul>
              </div>
          </div>
        )}
  
      </div>
      <MyRoutes />
    </div>
  );
};

export default App;
