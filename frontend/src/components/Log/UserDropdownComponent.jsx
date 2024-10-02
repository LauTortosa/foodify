import React from 'react';
import { Link } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';

const UserDropdownComponent = ({ username, userType }) => {
    const getUserLabel = () => {
        switch (userType) {
            case 'guest':
                return 'INV';
            case 'responsable':
                return 'AD';
            case 'operator':
                return 'OP';
            default:
                return '';
        }
    };

    return (
        <details className="dropdown dropdown-end mr-8">
            <summary 
                tabIndex={0} 
                role="button" 
                className="btn btn-active btn-neutral avatar bg-neutral text-neutral-content w-12 rounded-full"
            >
                <span className="text-xl">{getUserLabel()}</span>
            </summary>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 border-4"
            >
                <p className='text-center text-lg mt-2 underline'>Usuario: {username}</p>
                <li className='mt-2'>
                    {userType === 'guest' ? (
                        <Link to="/" className="text-lg flex flex-col items-center">Iniciar sesión</Link>
                    ) : (
                        <LogoutComponent />
                    )}
                </li>
            </ul>
        </details>
    );
}

export default UserDropdownComponent;