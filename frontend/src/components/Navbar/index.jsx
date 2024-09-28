import React from 'react';
import { Link } from 'react-router-dom';

import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';

const Navbar = () => {
  const username = useAuthenticatedUser();

  return (
    <div>
      <div className="flex flex-col bg-gray-300 h-screen p-4">
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
