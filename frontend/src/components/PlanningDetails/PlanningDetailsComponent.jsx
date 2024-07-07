import axios from "axios";
import { useEffect, useState } from "react";

import CheckboxLoads from "./CheckboxLoads";

const PlanningDetailsComponent = ({ planningId }) => {
    const [planning, setPlanning] = useState({ component_value: [], load: []});

    useEffect(() => {
        getPlanning();
    }, [planningId]);

    const getPlanning = async () => {
        const response = await axios.get(`http://localhost:8000/planning/api/${planningId}`);
        setPlanning(response.data);
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
        </div>
    );
}

export default PlanningDetailsComponent;