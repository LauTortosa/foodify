import axios from "axios";
import { useEffect, useState } from "react";

import PlanningTableComponent from "../components/Planning/PlanningTableComponent";

const PlanningRegisteredView = ({showLink = false, showState = false, showDelete = false}) => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        listRegistereds();
    }, []);

    const listRegistereds = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/registered');
        setPlannings(response.data);
    };

    return (
        <div className='container mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div></div>
                <div className='md:col-span-2 lg:col-span-3'>
                    <h2 className='text-center text-xl font-bold underline mb-8'>Planificaciones registradas</h2>
                    <PlanningTableComponent 
                        plannings={plannings} 
                        showLink={showLink} 
                        showState={showState} 
                        showDelete={showDelete} 
                    />  
                </div>
            </div> 
        </div>
    );
};

export default PlanningRegisteredView;

