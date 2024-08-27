import InputNumberComponent from "../Form/InputNumberComponent";

const LoadInputCalculateKilosComponent = ({ load, setLoad }) => {
    return (
        <div className="mt-8">
            <InputNumberComponent 
                label="Cargas" 
                value={load} 
                onChange={setLoad} 
                id="loadInput"
                className=""
            />
        </div>
    )
};

export default LoadInputCalculateKilosComponent;