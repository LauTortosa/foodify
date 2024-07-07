import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import PlanningDetailsComponent from "../components/PlanningDetails/PlanningDetailsComponent";

const PlanningDetailsView = () => {
    const { id: planningId } = useParams();
    const navigate = useNavigate();

    const deletePlanning = async () => {
        await axios.delete(`http://localhost:8000/planning/api/${planningId}`);
        navigate('/planning'); 
    }

    return (
        <div className="flex justify-center">
            <div className="card w-5/6 bg-base-100 shadow-xl">
                <div className="card-body">
                    <PlanningDetailsComponent planningId={planningId} />
                    <button className="btn mt-8 w-24" onClick={deletePlanning}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default PlanningDetailsView;