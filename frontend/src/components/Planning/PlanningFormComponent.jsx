import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import SelectTypeProductComponent from "../Form/SelectTypeProductComponent";

const PlanningFormComponent = () => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [error, setError] = useState();
    const [confirmMessage, setConfirmMessage] = useState();

const handleTypeSelect = (typeId, typeLabel) => {
      setValue("type_value", typeLabel);
      setValue("type_id", typeId);
};

const handleProductSelect = (productLabel) => {
    setValue("product_value", productLabel);
};

const handleSubmitForm = async (data) => {
    try {
        const date = new Date(data.date);
        if (isNaN(date.getTime())) {
            throw new Error("Fecha no valida");
        }

        const dataToSend = {
            date: date.toISOString().split('T')[0],
            load: parseInt(data.load), 
            tracebility: parseInt(data.tracebility),
            type: data.type_value, 
            product: data.product_value 
        };

        await axios.post('http://localhost:8000/planning/api/', dataToSend)
        reset();
        setError("");
        setConfirmMessage("Planificación creada con éxito");
    } catch (error) {
        const errorMessage = error.response?.data?.detail?.[0]?.msg || error.response?.data?.msg || error.message || "Error al añadir la planificación.";
        setError("Error al añadir la planificación: " + errorMessage);
        setConfirmMessage("");
    }
};

const clearMessage = () => {
    setConfirmMessage("");
    setError("");
};

return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="p-4">
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Fecha
            <input type="date" {...register("date")} className="grow"/>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Cargas
            <input type="number" {...register("load")} className="grow"/>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Trazab.
            <input type="number" {...register("tracebility")} className="grow"/>
        </label>      
        <SelectTypeProductComponent
            onTypeSelect={handleTypeSelect}
            onProductSelect={handleProductSelect}
        />
        <button type="submit" className="btn">Añadir Planificación</button>
        {error && <div role="alert" className="alert alert-warning mt-4 mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
            <button onClick={clearMessage} className="btn btn-sm btn-circle btn-ghost">✕</button>

        </div>}
        {confirmMessage && <div role="alert" className="alert alert-success mt-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{confirmMessage}</span>
            <button onClick={clearMessage} className="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>}


    </form>

  );
};

export default PlanningFormComponent;
