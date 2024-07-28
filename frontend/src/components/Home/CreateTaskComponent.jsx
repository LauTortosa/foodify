import axios from "axios";
import { useState } from "react";

const CreateTaskComponent = ({ getTask }) => {
    const [newTask, setNewTask] = useState("");
    const [error, setError] = useState("");

    const createTask = async () => {
        const dataToSend = {
            task: newTask,
            completed: "false"
        };

        try {
            await axios.post('http://localhost:8000/task/api/', dataToSend);
            setNewTask("");  
            getTask();  
            setError("");
        } catch (error) {
            setError("Error al crear la tarea: " + error.response.data.detail[0].msg);
        }
    };
    return ( 
        <div>
            <input 
                type="text"
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escribe una tarea"
                className="input input-bordered w-full max-w-xs mt-4 mr-4"
            />
            <button className="btn" onClick={createTask}>Añadir tarea</button>
            {error && <div role="alert" className="alert alert-warning mt-4 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
            </div>}
        </div>
        
    )
};

export default CreateTaskComponent;