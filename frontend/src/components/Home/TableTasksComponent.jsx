const TableTasksComponent = ({ listTasks, onCheckboxChange, getTask }) => {
    if (!Array.isArray(listTasks)) {
        return <div>No hay tareas disponibles.</div>;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Completada</th>
                </tr>
            </thead>
            <tbody>
                {listTasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.task}</td>
                        <td>
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => onCheckboxChange(task.id)} 
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableTasksComponent;