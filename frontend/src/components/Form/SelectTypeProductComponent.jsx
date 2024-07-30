import { useEffect, useState } from "react";
import axios from "axios";

const SelectTypeProductComponent = ({ onTypeSelect, onProductSelect }) => {
    const [types, setTypes] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => {
        loadTypes();
    }, []);
    
    const loadTypes = async () => {
        const response = await axios.get('http://localhost:8000/product/api/types');
        setTypes(response.data);
    };
    
    const loadProductsByType = async (typeId) => {
        const response = await axios.get(`http://localhost:8000/product/api/products?type_id=${typeId}`);
        const productsNames = response.data.map(product => ({
            id: product.id,
            product: product.product
        }));
        setFilteredProducts(productsNames);
    };
    
    const handleTypeChange = (e) => {
        const { value } = e.target;
        const selectedType = types.find(type => type.label === value);
        const typeId = selectedType ? selectedType.id : '';
        onTypeSelect(typeId, value);
        loadProductsByType(typeId);
    };
    
    const handleProductChange = (e) => {
        const { value } = e.target;
        const selectedProduct = filteredProducts.find(product => product.product === value);
        const productId = selectedProduct ? selectedProduct.id : '';
        onProductSelect(value, productId);
    };
    
    return (
        <div>
          <div className="mb-4">
          <select 
              name="type_value"
              onChange={handleTypeChange} 
              className="select select-bordered w-full">
            <option value="">Tipo de producto</option>
            {types.map(type => (
                <option key={type.id} value={type.label}>
                    {type.label}
                </option>
            ))}
          </select>
          </div>
          <div className="mb-4">
          <select 
              name="product_value"
              onChange={handleProductChange} 
              className="select select-bordered w-full">
            <option value="">Producto</option>
            {filteredProducts.map(product => (
                <option key={product.id} value={product.product}>
                    {product.product}
                </option>
            ))}
          </select>
          </div>
        </div>
    );
}

export default SelectTypeProductComponent;