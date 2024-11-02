import { useEffect, useState } from "react";

import apiClient from "../apiClient";
import CheckboxLoads from "./CheckboxLoads";

const PlanningDetailsComponent = ({ planningId, onEditClick }) => {
    const [planning, setPlanning] = useState({ 
        component_value: [], 
        state_value: "",
        load: 0,
        date_value: "",
        tracebility: 0,
        product_value: ""
    });

    useEffect(() => {
        getPlanning();
    }, [planningId]);

    const getPlanning = async () => {
        const response = await apiClient.get(`/planning/api/${planningId}`);
        const data = response.data;

        setPlanning({
            state_value: data.state_value,
            load: data.load,
            date_value: data.date_value,
            tracebility: data.tracebility,
            product_value: data.product_value,
            component_value: data.component_value || []
        });

    }

    return(
        <div className="flex flex-col">
        <div className="flex items-center">
            <h2 className="card-title uppercase flex items-center">
                <span>{planning.product_value}</span>
                <div className="badge badge-sm badge-outline ml-2">{planning.state_value}</div>
            </h2>
            
            <div className="ml-16 mt-10">
                <h2 className='text-md font-bold underline'>Acciones</h2>
                <button className="btn btn-sm mt-4" onClick={() => onEditClick(planning)}>Editar</button>
            </div>
        </div>
        <div className="flex items-center mb-8">
            <div className="flex flex-col">
                <p className="m-2">
                    <span className="text-sm font-bold mr-2">
                        Fecha de inicio:
                    </span> 
                    {planning.date_value}
                </p>
                <p className="m-2">
                    <span className="text-sm font-bold mr-2">
                        Cargas:  
                    </span> 
                    {planning.load}
                </p>
                <p className="m-2">
                    <span className="text-sm font-bold mr-2">
                        Trazabilidad:  
                    </span> 
                    {planning.tracebility}
                </p>
            </div>
        </div>
    
        <CheckboxLoads
            components={planning.component_value}
            load={planning.load}
            planningId={planningId}
        />
    </div>
    );
}

export default PlanningDetailsComponent;