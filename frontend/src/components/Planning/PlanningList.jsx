import React, { useState, useEffect } from 'react';
import axios from "axios";

const PlanningList = () => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/planning/api/list')
        .then(response => setPlannings(response.data))
        .catch(error => console.error(error));
    }, []);
    return (
        <div>
        <h2>Listado de Planificaciones</h2>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cargas</th>
                    <th>Trazabilidad</th>
                    <th>Estado</th>
                    <th>Producto</th>
                </tr>
            </thead>
            <tbody>
                {plannings.map(planning => (
                    <tr key={planning.id}>
                        <td>{planning.date_value}</td>
                        <td>{planning.load}</td>
                        <td>{planning.tracebility}</td>
                        <td>{planning.state_value}</td>
                        <td>{planning.product_value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default PlanningList;