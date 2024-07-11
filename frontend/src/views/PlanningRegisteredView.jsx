import axios from "axios";
import { useEffect, useState } from "react";

const PlanningRegisteredView = () => {
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        listRegistereds();
    }, []);

    const listRegistereds = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/registered');
        setPlannings(response.data);
        console.log(response.data);
    };

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
                </tr>
                ))};
            </tbody>
        </table>
    </div>    
    );
};

export default PlanningRegisteredView;

