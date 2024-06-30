import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-green-100 justify-center h-28">
      <Link to="/" className="btn btn-ghost text-xl">Inicio</Link>
      <Link to="/planning" className="btn btn-ghost text-xl">Planificaciones</Link>
    </div>
  );
};

export default Navbar;
