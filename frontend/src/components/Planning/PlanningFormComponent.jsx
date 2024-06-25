import { useForm } from "react-hook-form";

import axios from "axios";

import SelectTypeProductComponent from "../Form/SelectTypeProductComponent";

const PlanningFormComponent = () => {
    const { register, handleSubmit, setValue } = useForm();

const handleTypeSelect = (typeId, typeLabel) => {
      setValue("type_value", typeLabel);
      setValue("type_id", typeId);
};

const handleProductSelect = (productLabel) => {
    setValue("product_value", productLabel);
};

const handleSubmitForm = async (data) => {
    const dataToSend = {
      date: new Date(data.date).toISOString().split('T')[0],
      load: parseInt(data.load), 
      tracebility: parseInt(data.tracebility),
      type: data.type_value, 
      product: data.product_value 
    };
  
    const response = await axios.post('http://localhost:8000/planning/api/', dataToSend)
    console.log('Planificación añadida:', response.data);
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
    </form>
  );
};

export default PlanningFormComponent;
