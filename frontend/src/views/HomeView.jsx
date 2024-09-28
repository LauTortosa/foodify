import { useState, useEffect } from "react";
import axios from "axios";


import ListTasksComponent from "../components/Home/ListTasksComponent";
import LoginComponent from "../components/LoginComponent";
import Navbar from "../components/Navbar";

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
        <div className='container  mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='md:col-span-2 lg:col-span-1'>
                    <Navbar />
                </div>
                <div className='md:col-span-2 lg:col-span-3 lg:ml-24'>
                    <LoginComponent />
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
