import InputNumberComponent from "../Form/InputNumberComponent";

const LoadInputCalculateKilosComponent = ({ load, setLoad }) => {
    return (
        <div className="mt-8">
            <InputNumberComponent 
                label="Número de cargas" 
                value={load} 
                onChange={setLoad} 
                id="loadInput"
            />
        </div>
    )
};

export default LoadInputCalculateKilosComponent;