import React from 'react';
import UserDropdownComponent from './Log/UserDropdownComponent';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser';

const HeaderComponent = () => {
  const username = useAuthenticatedUser();
  const isGuest = !username;
  const userType = isGuest ? 'guest' : (username === 'responsable' ? 'responsable' : 'operator');

  return (
    <div className="navbar border-b-4 border-gray-300 mt-6">
      <h1 className="text-center text-5xl font-bold mt-10 mb-6">
        FOODIFY PLANNER
      </h1>
      <div className="flex ml-auto items-center space-x-4 mr-8 font-bold">
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Search" 
            className="input input-bordered w-24 sm:w-32 md:w-48 lg:w-64" 
          />
        </div>
        <UserDropdownComponent username={username} userType={userType} />
      </div>
    </div>
  );
};

export default HeaderComponent;
