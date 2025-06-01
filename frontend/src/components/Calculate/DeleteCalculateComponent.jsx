const DeletePlanningComponent = ({ setCalculatedKilosTotal }) => {
    const deleteCalculate = () => {
        setCalculatedKilosTotal({});
    }

    return (
        <div>
            <button 
                onClick={deleteCalculate}
                className="btn btn-sm mb-4 w-40">
                    Eliminar
                </button>
        </div>
    );
};

export default DeletePlanningComponent;