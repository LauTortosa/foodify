import { useState } from "react";

import apiClient from "../apiClient";
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const authenticatedUser = useAuthenticatedUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await apiClient.post('/users/api/login', {
                username,
                password,
            }, { withCredentials: true });
            if (response.data.success) {
                setError('');
                window.location.reload();
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError('An error occurred. Try again');
        }
    };

    return (
        <div>
            {!authenticatedUser && (
                <>
                    <h2 className="text-center text-md mt-4 mb-2">Inicio de sesión</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Usuario" 
                            className="input input-bordered input-sm w-full max-w-xs mb-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="input input-bordered input-sm w-full max-w-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex flex-col items-center">
                            <button type="submit" className="btn btn-sm mt-4 mb-4 text-md">Iniciar sesión</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default LoginComponent;