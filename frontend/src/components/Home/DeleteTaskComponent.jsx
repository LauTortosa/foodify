const DeleteTaskComponent = ({ taskId, deleteTask }) => {
    return (
        <button onClick={() => deleteTask(taskId)}>🗑️</button>
    );
};

export default DeleteTaskComponent;