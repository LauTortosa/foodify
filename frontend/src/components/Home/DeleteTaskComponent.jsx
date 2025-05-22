import axios from "axios";

const DeleteTaskComponent = ({ taskId, getTask }) => {
    const deleteTask = async () => {
        await axios.delete(`http://localhost:8000/task/api/${taskId}`);
        getTask();
    };
    
    return (
        <button onClick={deleteTask}>🗑️</button>
    );

};

export default DeleteTaskComponent;