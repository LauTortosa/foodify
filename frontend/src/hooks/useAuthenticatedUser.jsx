import { useEffect, useState } from "react";
import axios from 'axios';

const useAuthenticatedUser = () => {
    const [username, setUsername] = useState('');

    useEffect(()=> {
        const loadUser = async () => {
            const isDevelopment = import.meta.env.MODE === 'development';
            const myBaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

            try {
                const response = await axios.get(`${myBaseUrl}/users/api/me`, { withCredentials: true });
                if (response.data.authenticated) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error('Error checking authentication', error);
            }
        };

        loadUser();
    }, []);

    return username;
};
 export default useAuthenticatedUser;