import { useEffect, useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [authenticatedUser, setAuthenticatedUser] = useState('');
    
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/api/me', { withCredentials: true });
                if (response.data.authenticated) {
                    setAuthenticatedUser(response.data.username);
                } else {
                    setAuthenticatedUser('');
                }
            } catch (error) {
                console.error('Error checking authentication', error);
            }
        };
        
        checkAuthentication();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/api/login', {
                username,
                password,
            }, { withCredentials: true });
            if (response.data.success) {
                alert('Login successful');
                setAuthenticatedUser(username);
                setError('');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError('An error ocurred. Try again')
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/api/logout')
            if (response.data.success) {
                setAuthenticatedUser('');
                setUsername('');
                setPassword('');
                setError('');
            } else {
                setError('Logout failed');
            }
        } catch (error) {
            setError('An error ocurred');
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
