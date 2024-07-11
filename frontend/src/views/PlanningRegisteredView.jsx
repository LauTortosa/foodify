import axios from "axios";
import { useEffect, useState } from "react";

import PlanningTableComponent from "../components/Planning/PlanningTableComponent";

const PlanningRegisteredView = ({showLink = false, showState = false}) => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        listRegistereds();
    }, []);

    const listRegistereds = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/registered');
        setPlannings(response.data);
    };

    return ( 
        <PlanningTableComponent plannings={plannings} showLink={showLink} showState={showState} />  
    );
};

export default PlanningRegisteredView;

