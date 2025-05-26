import { useEffect, useState } from "react";
import api from "../api/api.jsx";
import CreateTaskComponent from "../components/Home/CreateTaskComponent";
import ListTasksComponent from "../components/Home/ListTasksComponent.jsx";

const TaskView = () => {
    const [newTask, setNewTask] = useState("");
    const [listTasks, setListTask] = useState([]);
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        getTask();
    }, []);

    const createTask = async () => {
        const dataToSend = {
            task: newTask,
            completed: "false"
        };

        try {
            await api.post("/task/api/", dataToSend);
            setNewTask("");
            getTask();
            setWarningMessage("");
        } catch (error) {
            console.error("Error al crear la tarea:", error.response.data);
            setWarningMessage("Error al crear la tarea: " + error.response.data.detail[0].msg);
        }
    };

    const getTask = async () => {
        const response = await api.get("/task/api/list");
        setListTask(response.data);
    };

    const deleteTask = async (taskId) => {
        await api.delete(`/task/api/${taskId}`);
        getTask();
    };

    const toggleCompleted = (id) => {
        setListTask(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            createTask();
        }
    };

    return (
        <div>
            <ListTasksComponent
                listTasks={listTasks}
                onCheckboxChange={toggleCompleted}
                deleteTask={deleteTask}
                getTask={getTask}
            />
            <CreateTaskComponent
                newTask={newTask}
                setNewTask={setNewTask}
                onKeyDown={onKeyDown}
                createTask={createTask}
                warningMessage={warningMessage}
                setWarningMessage={setWarningMessage} 
            />
        </div>
    );
};

export default TaskView;