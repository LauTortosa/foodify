import { useState, useEffect } from "react";
import axios from "axios";


import ListTasksComponent from "../components/Home/ListTasksComponent";

const HomeView = () => {
    const [listTasks, setListTask] = useState([]);

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const response = await axios.get('http://localhost:8000/task/api/list');
        setListTask(response.data);
    };

    return (
        <div className='container mx-auto mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='md:col-span-2 lg:col-span-1'>
                    <div className="card bg-base-100 w-96 shadow-xl mt-28">
                        <div className="card-body">
                            <h2 className="card-title">Inicio de sesión</h2>
                            <input type="text" placeholder="Usuario" className="input input-bordered w-full max-w-xs" />
                            <input type="text" placeholder="Contraseña" className="input input-bordered w-full max-w-xs" />
                            <button className="btn">Iniciar sesión</button>
                        </div>
                    </div>

                    
                </div>
                <div className='md:col-span-2 lg:col-span-3 lg:ml-24'>
                    <h2 className="text-center text-xl font-bold underline mb-4">Lista de tareas</h2>
                    <div className='overflow-x-auto'>
                        <ListTasksComponent
                            listTasks={listTasks}
                            setListTask={setListTask}
                            getTask={getTask}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
