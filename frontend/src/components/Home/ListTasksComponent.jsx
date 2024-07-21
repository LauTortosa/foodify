import axios from "axios";
import { useEffect, useState } from "react";

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
    );
};

export default ListTasksComponent;