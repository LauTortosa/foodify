import { useState } from 'react';
import api from "../api/api.jsx"
import usePdfGenerator from '../hooks/usePdfGenerator.jsx';

import ChecksProductsComponent from '../components/Calculate/ChecksProductsComponent';
import CalculateKilosComponent from '../components/Calculate/CalculateKilosComponent';
import DeleteCalculateComponent from '../components/Calculate/DeleteCalculateComponent';
import TableCalculateKilosComponent from '../components/Calculate/TableCalculateKilosComponent';
import LoadInputCalculateKilosComponent from '../components/Calculate/LoadInputCalculateKilosComponent';

const CalculateView = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [calculatedKilosTotal, setCalculatedKilosTotal] = useState({});
    const [load, setLoad] = useState(0);
    const { generatePdf } = usePdfGenerator();

    const getProductComponents = async (productId) => {
        const response = await api.get(`/product/api/${productId}`);
        return response.data.component_value;
    };

    const handleClick = () => {
        const rows = Object.entries(calculatedKilosTotal).map(([component, kilos], index) => ([
            index + 1,
            component,
            kilos
        ]));

        generatePdf({
            title: "Kilos",
            columns: ["#", "Componente", "Kilos"],
            data: rows,
            filename: "kilos.pdf"
        });
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
                <h2 className='text-md font-bold underline mb-4 mt-8'>Acciones</h2>
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
                <button className='btn btn-sm mb-4 w-40' onClick={handleClick}>Decargar pdf</button>

            </div>
            <div className="lg:col-span-3 overflow-x-auto">
                <h2 className="text-center text-xl font-bold underline mb-4">Cálculo de Kilos</h2>
                <TableCalculateKilosComponent 
                    calculatedKilosTotal={calculatedKilosTotal}
                />
            </div>
        </div>
        </div>
    );
};

export default CalculateView;
