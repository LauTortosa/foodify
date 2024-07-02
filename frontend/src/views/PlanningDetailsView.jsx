import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PlanningDetailsView = () => {
    const { id: planningId } = useParams();
    const navigate = useNavigate();
    const [planning, setPlanning] = useState(null);

    useEffect(() => {
        getPlanning();
    }, []);

    const getPlanning = async () => {
        const response = await axios.get(`http://localhost:8000/planning/api/${planningId}`);
        setPlanning(response.data);
    }
    if (!planning) {
        return <p>Cargando...</p>; 
    }
    return (
        <div className="flex justify-center ">
            <div className="card w-5/6 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title uppercase">
                        {planning.product_value}
                        <div className="badge badge-outline">{planning.state_value}</div>
                    </h2>
                    <div className="flex item-center mt-4">
                      <p>Fecha de inicio: {planning.date_value}</p>
                    </div>
                    <div className="flex item-center mt-4">
                      <p>Cargas: {planning.load}</p>
                    </div>
                    <div className="flex item-center mt-4">
                      <p>Trazabilidad: {planning.tracebility}</p>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Componentes</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planning.component_value.map((component, index) => {
                                const [ingredient, quantity] = component.split(' - ');
                                return (
                                    <tr key={index}>
                                        <td>{ingredient}</td>
                                        <td>{quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PlanningDetailsView;