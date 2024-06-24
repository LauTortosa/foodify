import { useState } from "react";
import axios from "axios";

import SelectTypeProductComponent from "../Form/SelectTypeProductComponent";

const PlanningFormComponent = () => {
  const [formData, setFormData] = useState({
    date: '',
    load: '',
    tracebility: '',
    type_value: '',
    product_value: ''
  });

const handleTypeSelect = (typeId, typeLabel) => {
    setFormData({
      ...formData,
      type_value: typeLabel,
      type_id: typeId
    });
  };

  const handleProductSelect = (productLabel) => {
    setFormData({
      ...formData,
      product_value: productLabel
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      date: new Date(formData.date).toISOString().split('T')[0],
      load: parseInt(formData.load), 
      tracebility: parseInt(formData.tracebility),
      type: formData.type_value, 
      product: formData.product_value 
    };
  
    const response = await axios.post('http://localhost:8000/planning/api/', dataToSend)
    console.log('Planificación añadida:', response.data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Fecha
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="grow"/>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Cargas
            <input type="number" name="load" value={formData.load} onChange={handleChange} className="grow"/>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Trazab.
            <input type="number" name="tracebility" value={formData.tracebility} onChange={handleChange} className="grow"/>
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
