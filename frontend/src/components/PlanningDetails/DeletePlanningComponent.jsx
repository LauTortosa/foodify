import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeletePlanningComponent = ({ planningId }) => {
    const navigate = useNavigate();

    const deletePlanning = async () => {
        await axios.delete(`http://localhost:8000/planning/api/${planningId}`);
        navigate('/planning');
    }

    return ( 
        <div>
            <button className="btn mt-8 w-24" onClick={deletePlanning}>Eliminar</button>
        </div>
    );
}

export default DeletePlanningComponent;