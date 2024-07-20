const TableCalculateKilosComponent = ({ calculatedKilosTotal }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Componente</th>
                    <th>Total kilos</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(calculatedKilosTotal).map(([componentName, totalKilos], index) => (
                <tr key={componentName} className="mb-4">
                    <td>{index + 1}</td>
                    <td>{componentName}</td>
                    <td>{totalKilos} kg</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableCalculateKilosComponent;