import axios from "axios";
import { useEffect, useState } from "react";
import TableTasksComponent from "./TableTasksComponent";

const ListTasksComponent = () => {
    const [listTasks, setListTask] = useState([]);

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const response = await axios.get('http://localhost:8000/task/api/list');
        setListTask(response.data);
    };

    const handleCheckboxChange = (id) => {
        setListTask(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <TableTasksComponent 
            listTasks={listTasks}
            onCheckboxChange={handleCheckboxChange}
            getTask={getTask}
        />
    );
};

export default ListTasksComponent;