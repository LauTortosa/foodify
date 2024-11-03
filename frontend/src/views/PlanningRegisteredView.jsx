import axios from "axios";
import { useEffect, useState } from "react";

import apiClient from "@/components/apiClient.jsx";
import PlanningTableComponent from "../components/Planning/PlanningTableComponent";

const PlanningRegisteredView = ({showLink = false, showState = false, showDelete = false}) => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        listRegistereds();
    }, []);

    const listRegistereds = async () => {
        const response = await apiClient.get('/planning/api/registered');
        setPlannings(response.data);
    };

    return (
        <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
                <div className='md:col-span-2 lg:col-span-1'></div>
                <div className='md:col-span-2 lg:col-span-3'>
                    <h2 className='text-center text-xl font-bold underline mt-4 mb-4'>Planificaciones registradas</h2>
                    <div className='overflow-x-auto ml-24 mb-24'>
                        <PlanningTableComponent 
                            plannings={plannings} 
                            showLink={showLink} 
                            showState={showState} 
                            showDelete={showDelete} 
                        />  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanningRegisteredView;

