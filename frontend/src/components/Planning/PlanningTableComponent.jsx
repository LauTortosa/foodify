import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sortData, handleSort } from '../../utils';

import DeletePlanningComponent from '../PlanningDetails/DeletePlanningComponent';
import UpdatePlanningComponent from '../PlanningDetails/UpdatePlanningComponent';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';

const PlanningTableComponent = ({ plannings, showLink, showState, refreshPlanningList, showDelete }) => {
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});
    const sortedPlannings = sortData(plannings, sortConfig);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingPlanning, setEditingPlanning] = useState(null);
    const username = useAuthenticatedUser();

    const onEditClick = (planning) => {
        setEditingPlanning(planning);
        setIsEditOpen(true);
    };

    const onEditClose = () => {
        setIsEditOpen(false),
        setEditingPlanning(false);
    };

    return (
        <div>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'index')}>#</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'date_value')}>Fecha</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'tracebility')}>Trazabilidad</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'product_value')}>Producto</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'load')}>Cargas</th>
                        {showState && <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'state_value')}>Estado</th>}
                        {username === 'responsable' && showDelete && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                {sortedPlannings.map((planning, index) => (
                    <tr key={planning.id} className="hover">
                        <td>{index + 1}</td>
                        <td>{planning.date_value}</td>
                        <td>{planning.tracebility}</td>
                        <td>{planning.product_value}</td>
                        <td>{planning.load}</td>
                        {showState && <td>{planning.state_value}</td>}
                            {username === 'responsable' && showDelete && <td className='flex items-center gap-2'>
                                <Link to={`/planning/${planning.id}`}>📒</Link>
                                <button onClick={() => onEditClick(planning)}>✏️</button>
                                <DeletePlanningComponent 
                                    planningId={planning.id} 
                                    refreshPlanningList={refreshPlanningList}
                                />
                        </td>}
                    </tr>
                ))}
                </tbody>
            </table>
            {isEditOpen && editingPlanning && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <UpdatePlanningComponent
                            planningId={editingPlanning.id}
                            initialState={editingPlanning.state_value}
                            initialLoad={editingPlanning.load}
                            initialDate={editingPlanning.date_value}
                            initialTracebility={editingPlanning.tracebility}
                            initialProduct={editingPlanning.product_value}
                            onClose={onEditClose}
                        />
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onEditClose}>✕</button>
                    </div>
                </div>
            )}
        </div>
        
    )
};

export default PlanningTableComponent;