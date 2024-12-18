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
        <div className="flex flex-col items-center">
            <button className="btn btn-sm mt-4 mb-4 text-md" onClick={handleLogout}>Cerrar sesión</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default LoginComponent;