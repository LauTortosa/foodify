import React from 'react';
import LogoutComponent from './LogoutComponent';
import LoginComponent from './LoginComponent';

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
                {userType === 'guest' ? (
                    <LoginComponent />
                    ) : (
                    <>
                        <p className='text-center text-lg mt-2 underline'>Usuario: {username}</p>
                        <LogoutComponent />
                    </>
                )}
            </ul>
        </details>
    );
}

export default UserDropdownComponent;