import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import SelectTypeProductComponent from "../Form/SelectTypeProductComponent";
import InputNumberComponent from "../Form/InputNumberComponent";
import AlertComponent from "../AlertComponent";

const PlanningFormComponent = ({ refreshPlanningList }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [error, setError] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

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
        setWarningMessage("");
        setSuccessMessage("Planificación creada con éxito");
        if (refreshPlanningList) refreshPlanningList();

    } catch (error) {
        if (error.response?.status === 409) {
            setWarningMessage("El número de trazabilidad ya existe");
        } else {
            const errorMessage = error.response?.data?.detail?.[0]?.msg || error.response?.data?.msg || error.message || "Error al añadir la planificación.";
            setWarningMessage("Error al añadir la planificación: " + errorMessage);
            setSuccessMessage("");
        }
    }
};

const clearSuccess = () => setSuccessMessage("");
const clearWarning = () => setWarningMessage("");


return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="p-4">
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Fecha
            <input type="date" {...register("date")} className="grow"/>
        </label>
        <InputNumberComponent 
            label="Cargas"
            id="load"
            className=""
            register={register}
        />
        <InputNumberComponent 
            label="Trazab."
            id="tracebility"
            className=""
            register={register}
        />
        <SelectTypeProductComponent
            onTypeSelect={handleTypeSelect}
            onProductSelect={handleProductSelect}
        />
        <button type="submit" className="btn">Añadir Planificación</button>
        {warningMessage && (
            <AlertComponent 
                type="warning"
                message={warningMessage}
                onClose={clearWarning}
            />
        )}
        {successMessage && (
            <AlertComponent 
                type="success"
                message={successMessage}
                onClose={clearSuccess}
            />
        )}    
    </form>
  );
};

export default PlanningFormComponent;
