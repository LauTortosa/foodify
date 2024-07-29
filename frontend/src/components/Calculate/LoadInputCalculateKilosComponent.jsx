const LoadInputCalculateKilosComponent = ({ load, setLoad }) => {
    return (
        <div className="mt-8">
            <label className="text-sm font-bold">
                Número de cargas
            </label>
            <input
                type="number"
                className="input input-bordered input-sm w-40 max-w-xs mt-2 mb-2"
                value={load}
                onChange={(e) => setLoad(parseInt(e.target.value))}
            />
        </div>
    )
};

export default LoadInputCalculateKilosComponent;