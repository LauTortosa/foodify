import axios from "axios";
import { useState } from "react";

const CreateTaskComponent = ({ getTask }) => {
    const [newTask, setNewTask] = useState("");

    const createTask = async () => {
        const dataToSend = {
            task: newTask,
            completed: "false"
        };

        await axios.post('http://localhost:8000/task/api/', dataToSend);
        setNewTask("");  
        getTask();  
    };
    // TODO validation form
    return ( 
        <div>
            <input 
                type="text"
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escribe una tarea"
                className="input input-bordered w-full max-w-xs mt-4"
            />
            <button className="btn ml-4" onClick={createTask}>Añadir tarea</button>
        </div>
        
    )
};

export default CreateTaskComponent;