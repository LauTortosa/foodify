import { useState, useEffect } from "react";
import axios from "axios";

import ListTasksComponent from "../components/Home/ListTasksComponent";
import EventsComponent from "../components/Events/EventsComponent";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import { useStatePlanning } from "../hooks/useStatePlanning";

const HomeView = () => {
    const username = useAuthenticatedUser();
    const [listTasks, setListTask] = useState([]);
    const { statePending, statePrepared } = useStatePlanning();

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const response = await axios.get('http://localhost:8000/task/api/list');
        setListTask(response.data);
    };

    return (
        <div className='container'>
            <div className='mt-8 ml-12'>
                <h2>¡Hola {username}!</h2>
                <p>Hoy tienes {statePending} trabajos por preparar y {statePrepared} por registrar</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-8'>
                <div className='md:col-span-2 lg:col-span-2 mt-6 ml-8'>
                    <EventsComponent/>
                </div>
                <div className='md:col-span-1 lg:col-span-4 mt-10 mr-20'>
                    <h2 className="text-xl font-bold underline mb-4 ml-2">Tareas pendientes</h2>
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
