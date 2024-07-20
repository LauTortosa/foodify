import { useEffect } from 'react';
import axios from 'axios';

const CalculateKilosComponent = ({ selectedProducts, load, setCalculatedKilosTotal, calculatedKilosTotal }) => {

    const getProductComponents = async (productId) => {
        const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
        return response.data.component_value;
    };

    const calculateTotal = async () => {
        const newCalculatedKilos = { ...calculatedKilosTotal };

        for (const productId of selectedProducts) {
            const components = await getProductComponents(productId);

            components.forEach((component) => {
                const [name, kilos] = component.split(" = ");
                const parsedKilos = parseFloat(kilos);
                const additionalKilos = parseFloat((parsedKilos * load).toFixed(2));

                if (!newCalculatedKilos[name]) {
                    newCalculatedKilos[name] = 0;
                }
                
                newCalculatedKilos[name] += additionalKilos;

            });
        }

        setCalculatedKilosTotal(newCalculatedKilos);
    };

    useEffect(() => {
    }, [selectedProducts]);

    return (
        <div>
            <button 
                onClick={calculateTotal}
                className="btn w-40 mt-6 mb-8">
                Calcular
            </button>
        </div>
    );
};

export default CalculateKilosComponent;
