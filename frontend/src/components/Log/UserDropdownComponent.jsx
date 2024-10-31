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
        <div className="dropdown dropdown-end mr-10">
            <div tabIndex="0" role="button" className="btn btn-active btn-neutral avatar bg-neutral text-neutral-content text-lg w-12 rounded-full">{getUserLabel()}</div>
            <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {userType === 'guest' ? (
                    <LoginComponent />
                        ) : (
                    <>
                        <p className='text-center text-md mt-2 underline'>Usuario: {username}</p>
                        <LogoutComponent />
                    </>
                )}
            </ul>
        </div>
    );
}

export default UserDropdownComponent;