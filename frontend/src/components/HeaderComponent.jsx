import React from 'react';
import UserDropdownComponent from './Log/UserDropdownComponent';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser';

const HeaderComponent = () => {
  const username = useAuthenticatedUser();
  const isGuest = !username;
  const userType = isGuest ? 'guest' : (username === 'responsable' ? 'responsable' : 'operator');

  return (
    <div className="navbar border-b-4 border-gray-300 px-8 py-4 items-center justify-between">
      <h1 className="text-3xl font-bold">FOODIFY PLANNER</h1>

      <div className="flex items-center gap-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <UserDropdownComponent username={username} userType={userType} />
      </div>
    </div>
  );
};


export default HeaderComponent;
