import { useParams, useNavigate } from "react-router-dom";

import PlanningDetailsComponent from "../components/PlanningDetails/PlanningDetailsComponent";
import DeletePlanningComponent from "../components/PlanningDetails/DeletePlanningComponent";

const PlanningDetailsView = () => {
    const { id: planningId } = useParams();
  
    return (
        <div className="flex justify-center">
            <div className="card w-5/6 bg-base-100 shadow-xl">
                <div className="card-body">
                    <PlanningDetailsComponent planningId={planningId} />
                    <DeletePlanningComponent planningId={planningId} />
                </div>
            </div>
        </div>
    );
}

export default PlanningDetailsView;