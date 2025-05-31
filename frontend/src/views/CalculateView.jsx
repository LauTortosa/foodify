import { useState } from 'react';
import api from "../api/api.jsx"

import ChecksProductsComponent from '../components/Calculate/ChecksProductsComponent';
import CalculateKilosComponent from '../components/Calculate/CalculateKilosComponent';
import DeleteCalculateComponent from '../components/Calculate/DeleteCalculateComponent';
import TableCalculateKilosComponent from '../components/Calculate/TableCalculateKilosComponent';
import LoadInputCalculateKilosComponent from '../components/Calculate/LoadInputCalculateKilosComponent';

const CalculateView = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [calculatedKilosTotal, setCalculatedKilosTotal] = useState({});
    const [load, setLoad] = useState(0);

    const getProductComponents = async (productId) => {
        const response = await api.get(`/product/api/${productId}`);
        return response.data.component_value;
    };

    return (
        <div className='container mx-auto px-4 py-6 min-h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div>
                <ChecksProductsComponent
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts} 
                />
                <LoadInputCalculateKilosComponent 
                    value={load}
                    setLoad={setLoad}
                />
                <CalculateKilosComponent
                    selectedProducts={selectedProducts}
                    load={load}
                    setCalculatedKilosTotal={setCalculatedKilosTotal}
                    calculatedKilosTotal={calculatedKilosTotal}
                    setSelectedProducts={setSelectedProducts}
                    getProductComponents={getProductComponents}
                />
                <DeleteCalculateComponent 
                    setSelectedProducts={setSelectedProducts}
                    setCalculatedKilosTotal={setCalculatedKilosTotal}
                />
            </div>
            <div className="lg:col-span-3 overflow-x-auto">
                <TableCalculateKilosComponent 
                    calculatedKilosTotal={calculatedKilosTotal}
                />
            </div>
        </div>
        </div>
    );
};

export default CalculateView;
