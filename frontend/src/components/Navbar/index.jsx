import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';

const Navbar = () => {
  const username = useAuthenticatedUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-300">
      <button 
        onClick={toggleMenu} 
        className="md:hidden p-2 rounded focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div className={`flex flex-col bg-gray-300 p-8 space-y-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="mb-4">
          <Link to="/" className="block py-2 px-4 text-xl">Inicio</Link>
        </div>
        <div className="mb-4">
          <Link to="/planning" className="block py-2 px-4 text-xl">Planificaciones</Link>
        </div>
        <div className="mb-4">
          <Link to="/recipes" className="block py-2 px-4 text-xl">Recetas</Link>
        </div>
        {username === 'responsable' && (
          <div className="mb-4">
            <Link to="/planning-registered" className="block py-2 px-4 text-xl">Diario de registros</Link>
          </div>
        )}
        {username && (
          <div className="mb-4">
            <Link to="/calculate-kilograms" className="block py-2 px-4 text-xl">Calcular kilos</Link>
          </div>
        )}
      </div>
  </div>
  );
};

export default Navbar;
