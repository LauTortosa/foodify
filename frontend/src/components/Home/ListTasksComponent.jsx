import TableTasksComponent from "./TableTasksComponent";
import CreateTaskComponent from "./CreateTaskComponent";

const ListTasksComponent = ({ listTasks, setListTask, getTask }) => {

    const handleCheckboxChange = (id) => {
        setListTask(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <>
        <TableTasksComponent 
            listTasks={listTasks}
            onCheckboxChange={handleCheckboxChange}
            getTask={getTask}
        />
        <CreateTaskComponent getTask={getTask} />
    </>
    );
};

export default ListTasksComponent;