import { useParams } from "react-router-dom";
import { useState } from "react";

import PlanningDetailsComponent from "../components/PlanningDetails/PlanningDetailsComponent";

const PlanningDetailsView = () => {
    const { id: planningId } = useParams();
    const [planningDetails, setPlanningDetails] = useState({ 
        state_value: "",
        load: 0,
        date_value: "",
        tracebility: 0,
        product_value: ""
    });
   
    // TODO when all checks are true, state change to 'prepared'
    return (
        <div className="flex justify-center">
            <div className="card w-5/6 bg-base-100 shadow-xl">
                <div className="card-body">
                    <PlanningDetailsComponent planningId={planningId} />
                </div>
            </div>
            
        </div>
    );
}

export default PlanningDetailsView;
