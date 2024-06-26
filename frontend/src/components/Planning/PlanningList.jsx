import { useState, useEffect } from 'react';
import axios from "axios";

const PlanningList = () => {
    const [plannings, setPlannings] = useState([]);

    const listPlanning = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/list');
        setPlannings(response.data);
    }

    useEffect(() => {
        listPlanning();
    }, []);
    
    return (
        <div >
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
                        <td>{planning.product_value}</td>
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