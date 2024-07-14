import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalculateView = () => {
    const [types, setTypes] = useState([]);
    const [productsByType, setProductsByType] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [calculatedKilosTotal, setCalculatedKilosTotal] = useState([]);
    const [load, setLoad] = useState(1);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
            const response = await axios.get('http://localhost:8000/product/api/types');
            const typesData = response.data;
            setTypes(typesData);

            const productsData = await Promise.all(
                typesData.map(async (type) => {
                    const productsResponse = await axios.get(`http://localhost:8000/product/api/products?type_id=${type.id}`);
                    return {
                        typeId: type.id,
                        products: productsResponse.data
                    };
                })
            );
            // organice products by type
            const updatedProductsByType = {};
            productsData.forEach(({ typeId, products }) => {
                updatedProductsByType[typeId] = products.map(product => ({
                    ...product,
                    checked: false 
                }));
            });

            setProductsByType(updatedProductsByType);
    };

    const getProductComponents = async (productId) => {
        const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
        return response.data.component_value;
    };

    const handleCheckboxChange = (typeId, productId) => {
        setProductsByType(prevProductsByType => {
            const updatedProducts = prevProductsByType[typeId].map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        checked: !product.checked
                    };
                }
                return product;
            });
            return {
                ...prevProductsByType,
                [typeId]: updatedProducts
            };
        });

        setSelectedProducts(prevSelectedProducts => {
        if (prevSelectedProducts.includes(productId)) {
                return prevSelectedProducts.filter(id => id !== productId);
            } else {
                return [...prevSelectedProducts, productId];
            }
        });
    };

    const calculateTotal = async () => {
        const newCalculatedKilosComponent = { ...calculatedKilosTotal };
    
        for (const productId of selectedProducts) {
            const components = await getProductComponents(productId);
    
            components.forEach((component) => {
                const [name, kilos] = component.split(" = ");
                const parsedKilos = parseFloat(kilos) * load;
    
                if (!newCalculatedKilosComponent[name]) {
                    newCalculatedKilosComponent[name] = 0;
                }
    
                newCalculatedKilosComponent[name] += parsedKilos;
            });
        }
    
        setCalculatedKilosTotal(newCalculatedKilosComponent);
        clearCheckedProducts();
    };

    const clearCheckedProducts = () => {
        const updatedProductsByType = {};
        for (const typeId in productsByType) {
            updatedProductsByType[typeId] = productsByType[typeId].map(product => ({
                ...product,
                checked: false
            }));
        }
        setProductsByType(updatedProductsByType);
    };
    
    return (
        <div className='grid grid-cols-4 divide-x-2 mt-12'>
            <div className='ml-8 mr-4'>
                <div>
                    {types.map(type => (
                        <div key={type.id}>
                            <h3 className="font-bold">{type.label}</h3>
                            <ul>
                                {productsByType[type.id]?.map(product => (
                                    <li key={product.id}>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={product.checked}
                                                onChange={() => handleCheckboxChange(type.id, product.id)}
                                                className="checkbox"
                                            />
                                            <span>{product.product}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-8 ml-4">
                    <label className="text-sm mt-8 mr-4 font-bold">
                        Número de cargas
                    </label>
                    <input
                        type="number"
                        className="input input-bordered input-sm w-40 max-w-xs mt-2 mb-2"
                        v-model="{load}" 
                        onChange={(e) => setLoad(parseInt(e.target.value))}
                    />
                    <button 
                        onClick={calculateTotal}
                        className="btn w-40 mt-6 mb-8">
                        Calcular
                    </button>
                </div>
            </div>
         <div className="col-span-3 overflow-x-auto mb-12 mr-8">
         <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Componente</th>
                            <th>Total kilos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(calculatedKilosTotal).map(([componentName, totalKilos], index) => (
                            <tr key={componentName} className="mb-4">
                                <td>{index + 1}</td>
                                <td>{componentName}</td>
                                <td>{totalKilos} kg</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
         </div>
        </div>
    );
};

export default CalculateView;

