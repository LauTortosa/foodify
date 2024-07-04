import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import CheckboxLoads from "../components/PlanningDetails/CheckboxLoads";

const PlanningDetailsView = () => {
    const { id: planningId } = useParams();
    const navigate = useNavigate();
    const [planning, setPlanning] = useState({ component_value: [], load: [] });

    useEffect(() => {
        getPlanning();
    }, [planningId]);

    const getPlanning = async () => {
        const response = await axios.get(`http://localhost:8000/planning/api/${planningId}`);
        setPlanning(response.data);
    }

    const deletePlanning = async () => {
        await axios.delete(`http://localhost:8000/planning/api/${planningId}`);
        navigate('/planning'); 
    }

    return (
        <div className="flex justify-center">
            <div className="card w-5/6 bg-base-100 shadow-xl">
                <div className="card-body">
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
                    <button className="btn mt-8 w-24" onClick={deletePlanning}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default PlanningDetailsView;