import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../../api/api.jsx"

import SelectTypeProductComponent from "../Form/SelectTypeProductComponent";
import InputNumberComponent from "../Form/InputNumberComponent";
import AlertComponent from "../AlertComponent";

const PlanningFormComponent = ({ refreshPlanningList }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
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
        const dataToSend = {
            date: data.date,
            load: parseInt(data.load), 
            tracebility: parseInt(data.tracebility),
            type: data.type_value, 
            product: data.product_value 
        };

        await api.post('/planning/api/', dataToSend)

        reset();
        setWarningMessage("");
        setSuccessMessage("Planificación creada con éxito");

        if (refreshPlanningList) refreshPlanningList();

     } catch (error) {
        let errorMessages = [];

        if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
            errorMessages = error.response.data.detail.map(err => err.msg);
        } else {
            errorMessages.push(error.response?.data?.msg || error.message || "Error al añadir la planificación.");
        }
        
        setWarningMessage(errorMessages);
        setSuccessMessage("");
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
            warningMessage.map((msg, index) => {
                return (
                   <AlertComponent 
                      key={index}   
                      type="warning"
                      message={msg}
                      onClose={clearWarning}
                   />
                );
            })
            
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
