import axios from "axios";

const DeletePlanningComponent = ({ planningId, refreshPlanningList }) => {
    const deletePlanning = async () => {
        await axios.delete(`http://localhost:8000/planning/api/${planningId}`);
       if (refreshPlanningList) refreshPlanningList();
    }

    return ( 
        <div>
            <button onClick={deletePlanning}>🗑️</button>
        </div>
    );
};

export default DeletePlanningComponent;