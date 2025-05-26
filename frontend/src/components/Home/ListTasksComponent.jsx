import TableTasksComponent from "./TableTasksComponent";

const ListTasksComponent = ({ listTasks, onCheckboxChange, deleteTask }) => {
    return (
        <TableTasksComponent 
            listTasks={listTasks}
            onCheckboxChange={onCheckboxChange}
            deleteTask={deleteTask}
        />
    );
};

export default ListTasksComponent;