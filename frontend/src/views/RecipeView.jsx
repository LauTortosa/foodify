import { useState } from 'react';
import { useForm } from "react-hook-form";

import SelectTypeProductComponent from "../components/Form/SelectTypeProductComponent";
import RecipeComponent from "../components/Recipes/RecipeComponent";
import Navbar from '../components/Navbar';

const RecipeView = () => {
  const { setValue } = useForm();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleTypeSelect = (typeId, typeLabel) => {
    setValue("type_value", typeLabel);
    setValue("type_id", typeId);
  };
  
  const handleProductSelect = async (productLabel, productId) => {
    setValue("product_value", productLabel);
    setSelectedProductId(productId);
  };

  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div>
          <Navbar />
        </div>
          <div className='md:col-span-2 lg:col-span-3'>
            <h2 className='text-center text-xl font-bold underline mb-4'>Seleccionar receta</h2>
            <div className='mx-96'>
              <SelectTypeProductComponent 
                onTypeSelect={handleTypeSelect}
                onProductSelect={handleProductSelect}/>
            </div>
            <RecipeComponent productId={selectedProductId} />
          </div>
          <div></div>
      </div>
    </div>
  );
};

export default RecipeView;