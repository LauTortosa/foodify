import axios from "axios";

const DeleteTaskComponent = ({ taskId, getTask }) => {
    const deleteTask = async () => {
        await axios.delete(`http://localhost:8000/task/api/${taskId}`);
        getTask();
    };
    
    return (
        <button className="btn btn-sm" onClick={deleteTask}>Eliminar</button>
    );

};

export default DeleteTaskComponent;