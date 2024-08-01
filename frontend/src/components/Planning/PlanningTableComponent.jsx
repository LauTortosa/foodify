import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeletePlanningComponent from '../PlanningDetails/DeletePlanningComponent';
import { sortData, handleSort } from '../../utils';

const PlanningTableComponent = ({ plannings, showLink, showState }) => {
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

    const sortedPlannings = sortData(plannings, sortConfig);

    return (
        <div className='overflow-x-auto'>
            <table className="table">
                <thead>
                    <tr>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'index')}>#</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'date_value')}>Fecha</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'tracebility')}>Trazabilidad</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'product_value')}>Producto</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'load')}>Cargas</th>
                        {showState && <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'state_value')}>Estado</th>}
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