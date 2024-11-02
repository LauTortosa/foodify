import { useEffect, useState } from 'react';

import apiClient from "../apiClient";
import AlertComponent from '../AlertComponent';

const CalculateKilosComponent = ({ selectedProducts, load, setCalculatedKilosTotal, calculatedKilosTotal }) => {
    const [warningMessage, setWarningMessage] = useState("");

    const getProductComponents = async (productId) => {
        const response = await apiClient.get(`/product/api/${productId}`);
        return response.data.component_value;
    };

    const calculateTotal = async () => {
        if (selectedProducts.length === 0) {
            setWarningMessage("Debe seleccionar al menos un producto");
            return;
        }
        if (load <= 0) {
            setWarningMessage("La carga tiene que ser mayor que 0");
            return;
        }
        clearWarning();

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

    const clearWarning = () => setWarningMessage(""); 

    useEffect(() => {
    }, [selectedProducts]);

    return (
        <div>
            <button 
                onClick={calculateTotal}
                className="btn w-40 mt-6">
                Calcular
            </button>
            {warningMessage && (
                <AlertComponent
                    type="warning"
                    message={warningMessage}
                    onClose={clearWarning}
                />
            )}
        </div>
    );
};

export default CalculateKilosComponent;
