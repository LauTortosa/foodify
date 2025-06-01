import InputNumberComponent from "../Form/InputNumberComponent";

const LoadInputCalculateKilosComponent = ({ load, setLoad }) => {
    return (
        <div className="mt-8">
            <InputNumberComponent 
                label="Cargas" 
                value={load} 
                onChange={setLoad} 
                id="loadInput"
                className="w-40"
            />
        </div>
    )
};

export default LoadInputCalculateKilosComponent;