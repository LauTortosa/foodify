import { useState, useEffect } from 'react';
import axios from "axios";

import PlanningTableComponent from './PlanningTableComponent';

const PlanningList = ({showLink = true, showState = true}) => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        listPlanning();
    }, []);

    const listPlanning = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/list');
        const filteredPlannings = response.data.filter(planning => planning.state_value !== 'Registrado');
        setPlannings(filteredPlannings);
    }

    return (
       <PlanningTableComponent plannings={plannings} showLink={showLink} showState={showState} />
    );
};

export default PlanningList;