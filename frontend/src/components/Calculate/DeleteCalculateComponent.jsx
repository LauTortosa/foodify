const DeletePlanningComponent = ({ setSelectedProducts, setCalculatedKilosTotal }) => {
    
    const deleteCalculate = () => {
        setSelectedProducts([]); 
        setCalculatedKilosTotal({});
    }

    return (
        <div>
            <button 
                onClick={deleteCalculate}
                className="btn w-40 mt-6 mb-8">
                    Eliminar
                </button>
        </div>
    );
};

export default DeletePlanningComponent;