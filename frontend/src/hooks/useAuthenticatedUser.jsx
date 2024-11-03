import { useEffect, useState } from "react"

import apiClient from "@/components/apiClient.jsx"

const useAuthenticatedUser = () => {
    const [username, setUsername] = useState('');

    useEffect(()=> {
        const loadUser = async () => {
            try {
                const response = await apiClient.get('/users/api/me', { withCredentials: true });
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