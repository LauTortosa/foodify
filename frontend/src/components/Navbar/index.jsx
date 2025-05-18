import { Link } from 'react-router-dom';

import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';

const Navbar = () => {
  const username = useAuthenticatedUser();

  return (
      <div className="flex flex-col bg-gray-300 h-full p-8">
        <div className="mb-4">
          <Link to="/" className="block py-2 px-4 text-xl">Inicio</Link>
        </div>
        <div className="mb-4">
          <Link to="/planning" className="block py-2 px-4 text-xl">Gestión de trabajo</Link>
        </div>
        <div className="mb-4">
          <Link to="/recipes" className="block py-2 px-4 text-xl">Recetas</Link>
        </div>
        {username && (
          <div className="mb-4">
            <Link to="/calculate-kilograms" className="block py-2 px-4 text-xl">Calcular kilos</Link>
          </div>
        )}
      </div>
  );
};

export default Navbar;
