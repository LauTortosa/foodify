import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeletePlanningComponent = ({ planningId }) => {
    const navigate = useNavigate();

    const deletePlanning = async () => {
        await axios.delete(`http://localhost:8000/planning/api/${planningId}`);
        navigate(0);
    }

    return ( 
        <div>
            <button className="btn w-24" onClick={deletePlanning}>Eliminar</button>
        </div>
    );
}

export default DeletePlanningComponent;