import React from 'react';
import { Link } from 'react-router-dom';

import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';

const Navbar = () => {
  const username = useAuthenticatedUser();

  return (
    <div className="navbar bg-green-100 h-28">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/planning">Planificaciones</Link></li>
            <li><Link to="/recipes">Recetas</Link></li>
            {username === 'responsable' && (
              <li><Link to="/planning-registered">Diario de registros</Link></li>
            )}
            <li><Link to="/calculate-kilograms">Calcular kilos</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar hidden md:flex">
        <Link to="/" className="btn btn-ghost text-xl">Inicio</Link>
        <Link to="/planning" className="btn btn-ghost text-xl">Planificaciones</Link>
        <Link to="/recipes" className="btn btn-ghost text-xl">Recetas</Link>
        {username === 'responsable' && (
          <Link to="/planning-registered" className="btn btn-ghost text-xl">Diario de registros</Link>
        )}
        {username && (
          <Link to="/calculate-kilograms" className="btn btn-ghost text-xl">Calcular kilos</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
