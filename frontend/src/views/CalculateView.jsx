import { useState } from 'react';

import ChecksProductsComponent from '../components/Calculate/ChecksProductsComponent';
import CalculateKilosComponent from '../components/Calculate/CalculateKilosComponent';
import DeleteCalculateComponent from '../components/Calculate/DeleteCalculateComponent';
import TableCalculateKilosComponent from '../components/Calculate/TableCalculateKilosComponent';

const CalculateView = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [calculatedKilosTotal, setCalculatedKilosTotal] = useState({});
    const [load, setLoad] = useState(1);

    // TODO validation form
    return (
        <div className='grid grid-cols-4 divide-x-2 mt-12'>
            <div className='ml-8 mr-4'>
                <ChecksProductsComponent
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts} 
                />
                <div className="mt-8 ml-4">
                    <label className="text-sm mt-8 mr-4 font-bold">
                        Número de cargas
                    </label>
                    <input
                        type="number"
                        className="input input-bordered input-sm w-40 max-w-xs mt-2 mb-2"
                        value={load}
                        onChange={(e) => setLoad(parseInt(e.target.value))}
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
