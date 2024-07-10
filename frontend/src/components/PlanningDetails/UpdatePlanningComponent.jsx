import axios from "axios";
import { useState, useEffect } from "react";

const UpdatePlanningComponent = ({ planningId, initialState, initialLoad, initialDate, initialTracebility, initialProduct, onClose, onPlanningUpdated }) => {
    const [editState, setEditState] = useState(initialState);
    const [editLoad, setEditLoad] = useState(initialLoad);

    useEffect(() => {
    }, [initialState, initialLoad, initialDate, initialTracebility, initialProduct]);

    {/* TODO getPlanning() after update */}
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
        onClose();
    }

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
            {/* TODO refactor */}
            <h4 className="underline mb-2">Estado</h4>
            <label htmlFor="pendiente" className="mr-3">Pendiente</label>
            <input
                type="radio"
                name="state"
                className="radio radio-xs"
                id="pendiente"
                value="Pendiente"
                checked={editState === "Pendiente"}
                onChange={() => setEditState("Pendiente")}
            />
            <br />
            <label htmlFor="pesado" className="mr-8">Pesado</label>
            <input
                type="radio"
                name="state"
                className="radio radio-xs"
                id="pesado"
                value="Pesado"
                checked={editState === "Pesado"}
                onChange={() => setEditState("Pesado")}
            />
            <br />
            <label htmlFor="registrado" className="mr-2">Registrado</label>
            <input
                type="radio"
                name="state"
                className="radio radio-xs"
                id="registrado"
                value="Registrado"
                checked={editState === "Registrado"}
                onChange={() => setEditState("Registrado")}
            />
            <button className="btn mt-6 mx-auto block" onClick={updatePlanning}>Aceptar</button>
        </div>
    )
}

export default UpdatePlanningComponent;

