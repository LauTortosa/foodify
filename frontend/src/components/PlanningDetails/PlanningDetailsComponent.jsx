import axios from "axios";
import { useEffect, useState } from "react";

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
        const response = await axios.get(`http://localhost:8000/planning/api/${planningId}`);
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
        <div>
            <h2 className="card-title uppercase">
                {planning.product_value}
                <div className="badge badge-outline">{planning.state_value}</div>
            </h2>
            <div className="flex item-center mt-4">
                <p>Fecha de inicio: {planning.date_value}</p>
            </div>
            <div className="flex item-center mt-4">
                <p>Cargas: {planning.load}</p>
            </div>
            <div className="flex item-center mt-4">
                <p>Trazabilidad: {planning.tracebility}</p>
            </div>
            <CheckboxLoads
                components={planning.component_value}
                load={planning.load}
                planningId={planningId}
            />
            <button className="btn mt-4" onClick={() => onEditClick(planning)}>Editar</button>
        </div>
    );
}

export default PlanningDetailsComponent;