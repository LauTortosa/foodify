import api from "../../api/api.jsx";

const DeletePlanningComponent = ({ planningId, refreshPlanningList }) => {
    const deletePlanning = async () => {
        await api.delete(`/planning/api/${planningId}`);
       if (refreshPlanningList) refreshPlanningList();
    }

    return ( 
        <div>
            <button onClick={deletePlanning}>🗑️</button>
        </div>
    );
};

export default DeletePlanningComponent;