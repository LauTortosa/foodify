import DeleteTaskComponent from "./DeleteTaskComponent";

const TableTasksComponent = ({ listTasks, onCheckboxChange, getTask }) => {
    return (
        <table className="table table-xs">
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
                            onChange={() => onCheckboxChange(task.id)}
                            className="checkbox"
                        />
                    </td>
                    <td>
                        <DeleteTaskComponent
                            taskId={task.id}
                            getTask={getTask}
                        />
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableTasksComponent;