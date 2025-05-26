import AlertComponent from "../AlertComponent";

const CreateTaskComponent = ({ newTask, setNewTask, onKeyDown, createTask, warningMessage, setWarningMessage }) => {
    const clearWarning = () => setWarningMessage("");
    return ( 
        <div>
            <input 
                type="text"
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Escribe una tarea"
                className="input input-bordered w-full max-w-lg mt-4"
            />
            <button className="btn mt-4 ml-4" onClick={createTask}>Añadir tarea</button>
            <div>
            {warningMessage && (
                <AlertComponent
                    type="warning"
                    message={warningMessage}
                    onClose={clearWarning}
                />
            )}
            </div>
        </div>
    )
};

export default CreateTaskComponent;