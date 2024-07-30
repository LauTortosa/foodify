import { useEffect, useState } from 'react';
import axios from 'axios';

const CalculateKilosComponent = ({ selectedProducts, load, setCalculatedKilosTotal, calculatedKilosTotal }) => {
    const [error, setError] = useState("");

    const getProductComponents = async (productId) => {
        const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
        return response.data.component_value;
    };

    const calculateTotal = async () => {
        if (selectedProducts.length === 0) {
            setError("Debe seleccionar al menos un producto");
            return;
        }
        if (load <= 0) {
            setError("La carga tiene que ser mayor que 0");
            return;
        }
        setError("");

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
                className="btn w-40 mt-6">
                Calcular
            </button>
            {error && <div role="alert" className="alert alert-warning mt-4 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
            </div>}
        </div>
    );
};

export default CalculateKilosComponent;
