import { useState, useEffect } from "react";
import axios from "axios";

import ListTasksComponent from "../components/Home/ListTasksComponent";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";

const HomeView = () => {
    const username = useAuthenticatedUser();
    const [listTasks, setListTask] = useState([]);

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const response = await axios.get('http://localhost:8000/task/api/list');
        setListTask(response.data);
    };

    return (
        <div className='container'>
            <div className='mt-8 ml-28 mb-12'>
                <h2>¡Hola {username}!</h2>
                <p>Hoy tienes </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-8'>
                <div className='md:col-span-2 lg:col-span-1 mt-6 ml-8'>Calendario</div>
                <div className='md:col-span-1 lg:col-span-4 lg:ml-24 mt-6 mr-20'>
                    <h2 className="text-center text-xl font-bold underline mb-4">Tareas pendientes</h2>
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
