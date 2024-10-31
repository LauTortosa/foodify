import axios from "axios";
import { useState } from "react";
import AlertComponent from "../AlertComponent";

const CreateTaskComponent = ({ getTask }) => {
    const [newTask, setNewTask] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    const createTask = async () => {
        const dataToSend = {
            task: newTask,
            completed: "false"
        };

        try {
            await axios.post('http://localhost:8000/task/api/', dataToSend);
            setNewTask("");  
            getTask();  
            setWarningMessage("");
        } catch (error) {
            setWarningMessage("Error al crear la tarea: " + error.response.data.detail[0].msg);
        }
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            createTask();
        }
    };

    const clearWarning = () => setWarningMessage("");

    return ( 
        <div>
            <input 
                type="text"
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe una tarea"
                className="input input-bordered w-full max-w-lg mt-4"
            />
            <button className="btn mt-4 ml-4" onClick={createTask}>Añadir tarea</button>
            <div>
            {warningMessage && (
                <AlertComponent
                    type="warning"
                    message={warningMessage}
                    onClose={clearWarning}
                />
            )}
            </div>
        </div>
    )
};

export default CreateTaskComponent;