import { useState, useEffect } from "react";

import ListTasksComponent from "@/components/Home/ListTasksComponent";
import apiClient from "@/components/apiClient"

const HomeView = () => {
    const [listTasks, setListTask] = useState([]);

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        try {
            const response = await apiClient.get('/task/api/list');
            setListTask(response.data);
        } catch (error) {
            console.error('error al obtener datos', error);
        }
    };

    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
                <div className='hidden lg:block lg:col-span-1'></div>
                <div className='col-span-1 lg:col-span-3 lg:ml-24 mt-6'>
                    <h2 className="text-center text-lg  sm:text-xl lg:text-2xl font-bold underline mb-4">Lista de tareas</h2>
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
