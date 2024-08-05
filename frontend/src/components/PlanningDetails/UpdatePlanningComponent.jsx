import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputRadioComponent from "../Form/InputRadioComponent";

const UpdatePlanningComponent = ({ 
    planningId, 
    initialState, 
    initialLoad, 
    initialDate, 
    initialTracebility, 
    initialProduct, 
    onClose 
}) => {

    const [editState, setEditState] = useState(initialState);
    const [editLoad, setEditLoad] = useState(initialLoad);

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const updatePlanning = async () => {
        const newData = { 
            load: parseInt(editLoad),
            state_value: editState,
            date: new Date(
                initialDate.split('/').reverse().join('-')
            ).toISOString().split('T')[0],
            tracebility: initialTracebility,
            product: initialProduct
        };
    
        await axios.put(`http://localhost:8000/planning/api/${planningId}`, newData);
        navigate(0);
        onClose();
    }

    const radioOptions = [
        { id: 'pendiente', label: 'Pendiente', value: 'Pendiente'},
        { id: 'pesado', label: 'Pesado', value: 'Pesado'},
        { id: 'registrado', label: 'Registrado', value: 'Registrado'}
    ];

    return (
        <div>
            <h3 className="font-bold text-lg text-center">Editar planificación</h3>
            <h4 className="underline mb-2">Cargas</h4>
            <p>Número actual: {initialLoad}</p>
            <label htmlFor="load">Número de cargas nuevo</label>
            <input
                type="number"
                className="input input-bordered input-sm w-40 max-w-xs ml-4 mb-2"
                id="load"
                value={editLoad}
                onChange={(e) => setEditLoad(e.target.value)}
            />
            <div className="divider"></div>
            <h4 className="underline mb-2">Estado</h4>
            <InputRadioComponent
                name="state"
                options={radioOptions}
                selectedValue={editState}
                onChange={setEditState}
            />
            <button className="btn mt-6 mx-auto block" onClick={updatePlanning}>Aceptar</button>
        </div>
    )
}

export default UpdatePlanningComponent;