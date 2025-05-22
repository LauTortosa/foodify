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
        <div className='container mx-auto px-4 py-6 min-h-screen'>
            <div className=''>
                <h2>¡Hola {username}!</h2>
                <p>Hoy tienes {statePending} trabajos por preparar y {statePrepared} por registrar</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
                <div className='lg:col-span-2 mt-6'>
                    <EventsComponent/>
                </div>
                <div className='lg:col-span-4 mt-10'>
                    <h2 className="text-xl font-bold underline mb-4">Tareas pendientes</h2>
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
