import apiClient from "../apiClient";

const DeletePlanningComponent = ({ planningId, refreshPlanningList }) => {
    const deletePlanning = async () => {
        await apiClient.delete(`/planning/api/${planningId}`);
       if (refreshPlanningList) refreshPlanningList();
    }

    return ( 
        <div>
            <button className="btn w-24" onClick={deletePlanning}>Eliminar</button>
        </div>
    );
};

export default DeletePlanningComponent;