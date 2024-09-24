import { useEffect, useState } from "react";
import axios from "axios";
import useAuthenticatedUser from './../hooks/useAuthenticatedUser';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const authenticatedUser = useAuthenticatedUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/api/login', {
                username,
                password,
            }, { withCredentials: true });
            if (response.data.success) {
                alert('Login successful');
                setError('');
                window.location.reload();
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError('An error occurred. Try again');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/api/logout', {}, { withCredentials: true });
            if (response.data.success) {
                setUsername('');
                setPassword('');
                setError('');
                window.location.reload();
            } else {
                setError('Logout failed');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };
    
    return (
        <div>
            {authenticatedUser && (
                <div>
                    <p>Sesión iniciada con: {authenticatedUser}</p>
                    <button 
                        className="btn mt-4"
                        onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}
            {!authenticatedUser && (
                <div className="card bg-base-100 w-64 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Inicio de sesión</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Usuario" 
                                className="input input-bordered w-full max-w-xs mb-2"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            <input 
                                type="password" 
                                placeholder="Contraseña" 
                                className="input input-bordered w-full max-w-xs"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="btn mt-4">Iniciar sesión</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginComponent;