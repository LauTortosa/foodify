import axios from 'axios';

const CalculateKilosComponent = ({ selectedProducts, load, setCalculatedKilosTotal }) => {
    const getProductComponents = async (productId) => {
        const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
        return response.data.component_value;
    };

    const calculateTotal = async () => {
        const newCalculatedKilos = {};
    
        for (const productId of selectedProducts) {
            const components = await getProductComponents(productId);
    
            components.forEach((component) => {
                const [name, kilos] = component.split(" = ");
                const parsedKilos = parseFloat(kilos) * load;
                const roundedKilos = parseFloat(parsedKilos.toFixed(2));
    
                if (!newCalculatedKilos[name]) {
                    newCalculatedKilos[name] = 0;
                }
                newCalculatedKilos[name] += roundedKilos;
            });
        }
        setCalculatedKilosTotal(newCalculatedKilos);
       // clearCheckedProducts();
    };

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

export default CalculateKilosComponent