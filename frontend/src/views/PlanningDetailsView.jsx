import { useParams } from "react-router-dom";
import { useState } from "react";

import PlanningDetailsComponent from "../components/PlanningDetails/PlanningDetailsComponent";
import UpdatePlanningComponent from "../components/PlanningDetails/UpdatePlanningComponent";

const PlanningDetailsView = () => {
    const { id: planningId } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [planningDetails, setPlanningDetails] = useState({ 
        state_value: "",
        load: 0,
        date_value: "",
        tracebility: 0,
        product_value: ""
    });
   
    const editClick = (details) => {
        setPlanningDetails(details);
        setIsEdit(true);
    };

    const editClose = () => {
        setIsEdit(false);
    };
    // TODO when all checks are true, state change to 'prepared'
    return (
        <div className="flex justify-center p-4">
            <div className="card w-full max-w-4xl bg-base-100 shadow-xl md:w-5/6">
                <div className="card-body">
                    <PlanningDetailsComponent planningId={planningId} onEditClick={editClick} />
                </div>
            </div>
            {isEdit && (
                <div className="modal modal-open">
                    <div className="modal-box w-full max-w-lg">
                        <UpdatePlanningComponent
                            planningId={planningId}
                            initialState={planningDetails.state_value}
                            initialLoad={planningDetails.load}
                            initialDate={planningDetails.date_value}
                            initialTracebility={planningDetails.tracebility}
                            initialProduct={planningDetails.product_value}
                            onClose={editClose}
                        />
                        <button 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                            onClick={editClose}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlanningDetailsView;
