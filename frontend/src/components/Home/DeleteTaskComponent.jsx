import apiClient from "../apiClient";

const DeleteTaskComponent = ({ taskId, getTask }) => {
    const deleteTask = async () => {
        await apiClient.delete(`/task/api/${taskId}`);
        getTask();
    };
    
    return (
        <button className="btn btn-sm" onClick={deleteTask}>Eliminar</button>
    );

};

export default DeleteTaskComponent;