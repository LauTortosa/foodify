import api from "../../api/api.jsx";
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
    
        await api.put(`/planning/api/${planningId}`, newData);
        navigate(0);
        onClose();
    };

    const radioOptions = [
        { id: 'pendiente', label: 'Pendiente', value: 'Pendiente'},
        { id: 'pesado', label: 'Pesado', value: 'Pesado'},
        { id: 'registrado', label: 'Registrado', value: 'Registrado'}
    ];

    return (
        <div className="space-y-4 px-4 py-2">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Editar trabajo</h2>

            <div className="bg-base-200 rounded-xl p-4 shadow">
                <h3 className="text-md font-medium text-gray-700 mb-1">Producto</h3>
                <p className="text-lg font-semibold">{initialProduct}</p>

                <h3 className="text-md font-medium text-gray-700 mt-4 mb-1">Nº Trazabilidad</h3>
                <p className="text-lg font-semibold">{initialTracebility}</p>

                <h3 className="text-md font-medium text-gray-700 mt-4 mb-1">Cargas actuales</h3>
                <p className="text-lg font-semibold">{initialLoad}</p>

                <div className="mt-4">
                <label htmlFor="newLoad" className="block mb-1 text-gray-700 font-medium">
                    Número de cargas nuevo
                </label>
                <input
                    type="number"
                    id="newLoad"
                    value={editLoad}
                    onChange={e => setEditLoad(Number(e.target.value))}
                    className="w-24 rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
        </div>

        <div className="divider">Estado</div>
            <InputRadioComponent
                name="state"
                options={radioOptions}
                selectedValue={editState}
                onChange={setEditState}
            />

            <div className="text-center">
                <button
                    className="btn mt-4 bg-gray-600 text-white hover:bg-gray-700 border-none"
                    onClick={updatePlanning}
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default UpdatePlanningComponent;