import { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/api/login', {
                username,
                password,
            });
            if (response.data.success) {
                alert('Login successful');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError('An error ocurred. Try again')
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Inicio de sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        className="input input-bordered w-full max-w-xs"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Contraseña" 
                        className="input input-bordered w-full max-w-xs"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <button type="submit" className="btn">Iniciar sesión</button>
                </form>
                
            </div>
        </div>
    );
}

export default LoginComponent;
