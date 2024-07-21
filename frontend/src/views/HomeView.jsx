import axios from "axios";
import { useEffect, useState } from "react";

import StatePendingComponent from "../components/Home/StatePendingComponent";
import StatePreparedComponent from "../components/Home/StatePreparedComponent";
import ListTasksComponent from "../components/Home/ListTasksComponent";

const HomeView = ({ statePending, statePrepared, listTasks, setListTask }) => {
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

    return (
        <div className='container mx-auto mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='md:col-span-2 lg:col-span-1'>
                    <h2 className='text-center text-xl font-bold underline mb-4'>Planificaciones pendientes</h2>
                    <ul>
                        <StatePendingComponent statePending={statePending} />
                        <StatePreparedComponent statePrepared={statePrepared} />    
                    </ul>
                </div>
                <div className='md:col-span-2 lg:col-span-3 lg:ml-24'>
                    <h2 className="text-center text-xl font-bold underline mb-4">Lista de tareas</h2>
                    <div className='overflow-x-auto'>
                        <ListTasksComponent
                            listTasks={listTasks}
                            setListTask={setListTask}
                        />
                        <input 
                            type="text"
                            value={newTask} 
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Escribe una tarea"
                            className="input input-bordered w-full max-w-xs mt-4"
                        />
                        <button className="btn ml-4" onClick={createTask}>Añadir tarea</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
