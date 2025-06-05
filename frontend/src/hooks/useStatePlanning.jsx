import api from "../api/api.jsx";
import { useEffect, useState } from "react";

export const useStatePlanning = () => {
    const [statePending, setStatePending] = useState(0);
    const [statePrepared, setStatePrepared] = useState(0);

    useEffect(() => {
        getStatePending();
        getStatePrepared();
    }, []);

    const getStatePending = async() => {
        const response = await api.get('/planning/api/state/pending');
        setStatePending(response.data["planning pending"]);
    };

    const getStatePrepared = async() => {
        const response = await api.get('/planning/api/state/prepared');
        setStatePrepared(response.data["planning prepared"]);
    };

    return { statePending, statePrepared };
};