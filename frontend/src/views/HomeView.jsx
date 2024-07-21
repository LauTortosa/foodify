import axios from "axios";
import { useEffect, useState } from "react";

import StatePendingComponent from "../components/Home/StatePendingComponent";
import StatePreparedComponent from "../components/Home/StatePreparedComponent";

const HomeView = ({ statePending, statePrepared }) => {
    const [listTasks, setListTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const response = await axios.get('http://localhost:8000/task/api/list');
        setListTask(response.data);
    };

    const deleteTask = async (taskId) => {
        await axios.delete(`http://localhost:8000/task/api/${taskId}`);
        getTask();
    }

    const createTask = async () => {
        const dataToSend = {
            task: newTask,
            completed: "false"
        };

        await axios.post('http://localhost:8000/task/api/', dataToSend);
        setNewTask("");  
        getTask();  
    };

    const handleCheckboxChange = (id) => {
        setListTask(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tarea</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {listTasks.map((task, index) => (
                                <tr key={task.id} className="hover">
                                    <td>{index + 1}</td>
                                    <td>{task.task}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleCheckboxChange(task.id)}
                                            className="checkbox"
                                        />
                                    </td>
                                    <td>
                                        <button className="btn w-20" onClick={() => deleteTask(task.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <input 
                            type="text"
                            value={newTask} 
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Escribe una tarea"
                            className="input input-bordered w-full max-w-xs mt-4"
                        />
                        <button className="btn w-20 mt-2" onClick={createTask}>Añadir tarea</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
