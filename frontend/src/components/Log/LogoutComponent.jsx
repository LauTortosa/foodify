import { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [error, setError] = useState('');

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/api/logout', {}, { withCredentials: true });
            if (response.data.success) {
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
            <button onClick={handleLogout} className="btn btn-primary">Cerrar sesión</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default LoginComponent;