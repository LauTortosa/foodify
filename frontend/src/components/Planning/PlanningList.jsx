import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const PlanningList = () => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        listPlanning();
    }, []);

    const listPlanning = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/list');
        setPlannings(response.data);
    }

    return (
        <div className='overflow-x-auto'>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Trazabilidad</th>
                        <th>Producto</th>
                        <th>Cargas</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {plannings.map((planning, index) => (
                    <tr key={planning.id} className="hover">
                        <td>{index + 1}</td>
                        <td>{planning.date_value}</td>
                        <td>{planning.tracebility}</td>
                        <td className="text-blue-500 hover:underline">
                            <Link to={`/planning/${planning.id}`}>
                                {planning.product_value}
                            </Link>
                        </td>
                        <td>{planning.load}</td>
                        <td>{planning.state_value}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanningList;