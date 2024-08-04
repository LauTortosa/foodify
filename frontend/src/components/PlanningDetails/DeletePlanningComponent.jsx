import axios from "axios";

const DeletePlanningComponent = ({ planningId, refreshPlanningList }) => {
    const deletePlanning = async () => {
        await axios.delete(`http://localhost:8000/planning/api/${planningId}`);
       if (refreshPlanningList) refreshPlanningList();
    }

    return ( 
        <div>
            <button className="btn w-24" onClick={deletePlanning}>Eliminar</button>
        </div>
    );
};

export default DeletePlanningComponent;