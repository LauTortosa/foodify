import { Link } from 'react-router-dom';
import DeletePlanningComponent from '../PlanningDetails/DeletePlanningComponent';
import { useState } from 'react';

const PlanningTableComponent = ({ plannings, showLink, showState }) => {
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

    const sortedPlannings = [...plannings].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1; // -1 a va antes que b
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1; // 1 a va despues de b

        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className='overflow-x-auto'>
            <table className="table">
                <thead>
                    <tr>
                        <th className='cursor-pointer' onClick={() => handleSort('index')}>#</th>
                        <th className='cursor-pointer' onClick={() => handleSort('date_value')}>Fecha</th>
                        <th className='cursor-pointer' onClick={() => handleSort('tracebility')}>Trazabilidad</th>
                        <th className='cursor-pointer' onClick={() => handleSort('product_value')}>Producto</th>
                        <th className='cursor-pointer' onClick={() => handleSort('load')}>Cargas</th>
                        {showState && <th className='cursor-pointer' onClick={() => handleSort('state_value')}>Estado</th>}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {sortedPlannings.map((planning, index) => (
                    <tr key={planning.id} className="hover">
                        <td>{index + 1}</td>
                        <td>{planning.date_value}</td>
                        <td>{planning.tracebility}</td>
                        {showLink ? (
                        <td className="text-blue-500 hover:underline">
                            <Link to={`/planning/${planning.id}`}>
                                {planning.product_value}
                            </Link>
                            </td>
                        ) : (
                        <td>{planning.product_value}</td>
                        )}
                        <td>{planning.load}</td>
                        {showState && <td>{planning.state_value}</td>}
                        <td><DeletePlanningComponent planningId={planning.id} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default PlanningTableComponent;