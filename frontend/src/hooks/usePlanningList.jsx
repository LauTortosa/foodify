import { useState, useEffect, useCallback } from 'react';
import api from "../api/api.jsx";

const usePlanningList = () => {
    const [plannings, setPlannings] = useState([]);

    const listPlanning = useCallback(async () => {
        const response = await api.get('/planning/api/list');
        const filteredPlannings = response.data.filter(planning => planning.state_value !== 'Registrado');
        setPlannings(filteredPlannings);
    }, []);

    useEffect(() => {
        listPlanning();
    }, [listPlanning]);

    return { plannings, listPlanning };
};

export default usePlanningList;