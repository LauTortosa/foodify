import { useState } from 'react';

import ChecksProductsComponent from '../components/Calculate/ChecksProductsComponent';
import CalculateKilosComponent from '../components/Calculate/CalculateKilosComponent';
import DeleteCalculateComponent from '../components/Calculate/DeleteCalculateComponent';
import TableCalculateKilosComponent from '../components/Calculate/TableCalculateKilosComponent';
import LoadInputCalculateKilosComponent from '../components/Calculate/LoadInputCalculateKilosComponent';

const CalculateView = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [calculatedKilosTotal, setCalculatedKilosTotal] = useState({});
    const [load, setLoad] = useState(0);

    // TODO validation form
    return (
        <div className='grid grid-cols-4 divide-x-2 mt-12'>
            <div className='ml-8 mr-4'>
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
                />
                <DeleteCalculateComponent 
                    setSelectedProducts={setSelectedProducts}
                    setCalculatedKilosTotal={setCalculatedKilosTotal}
                />
            </div>
            <div className="col-span-3 overflow-x-auto mb-12 mr-8">
                <TableCalculateKilosComponent 
                    calculatedKilosTotal={calculatedKilosTotal}
                />
            </div>
        </div>
    );
};

export default CalculateView;
