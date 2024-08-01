import { useState } from "react";
import { sortData, handleSort } from "../../utils";

const TableCalculateKilosComponent = ({ calculatedKilosTotal }) => {
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

    const sortedTotalKilos = sortData(Object.entries(calculatedKilosTotal).map(([key, value]) => ({ componentName: key, totalKilos: value })), sortConfig);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Componente</th>
                    <th className="cursor-pointer" onClick={() => handleSort(sortConfig, setSortConfig, 'totalKilos')}>Total kilos</th>
                </tr>
            </thead>
            <tbody>
                {sortedTotalKilos.map(({ componentName, totalKilos }, index) => (
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