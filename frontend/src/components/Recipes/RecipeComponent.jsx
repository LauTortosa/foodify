import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeComponent = ({ productId }) => {
    const [recipe, setRecipe] = useState(null);
    const [components, setComponents] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [confirmMessage, setConfirmMessage] = useState('');
    const navigate = useNavigate();

    const getComponents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/product/api/component');
            setComponents(response.data);
        } catch (error) {
            console.error('Error fetching components:', error);
        }
    };

    const getRecipe = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
            setRecipe(response.data);
        } catch (error) {
            console.error('Error fetching recipe:', error.response.data);
        }
    };

    useEffect(() => {
        getComponents();
    }, []);

    const handleComponentChange = (e) => {
        setSelectedComponent(e.target.value);
    };

    const createComponent = async (data) => {
        try {
            const dataToSend = {
                product_id: productId,
                component_id: selectedComponent,
                kilograms: quantity,
            };

            await axios.post('http://localhost:8000/product/api/component-product', dataToSend);
            setSelectedComponent("");
            setQuantity(0);
            setConfirmMessage("Componente añadido con éxito");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    useEffect(() => {
        getComponents();
        if (productId) {
            getRecipe(productId);
        }
    }, [productId]);

    if (!recipe) {
        return ( 
            <div className="flex justify-center">Cargando...</div>
        );
    }

    const clearMessage = () => {
        setConfirmMessage("");
        setError("");
    };

    return (
        <div className="">
            <div className="">
                <div className="">
                    <h2 className="font-bold uppercase text-3xl text-center w-full mb-8">{recipe.product}</h2>
                    <label htmlFor={`modal-add-component-${productId}`} className="btn">
                        Añadir Componente
                    </label>
                    <input type="checkbox" id={`modal-add-component-${productId}`} className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <label 
                                    htmlFor={`modal-add-component-${productId}`} 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={() => {
                                        navigate(0);
                                    }}
                                >
                                    ✕
                                </label>
                            </form>
                            <h2 className="text-center text-xl font-bold mb-4">Añadir Componente</h2>
                            <select 
                                name="component_value"
                                value={selectedComponent}
                                onChange={handleComponentChange} 
                                className="select select-bordered w-full"
                            >
                                <option value="">Seleccionar Componente</option>
                                {components.map(component => (
                                    <option key={component.id} value={component.id}>
                                        {component.component_value}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="input input-bordered w-full mt-2"
                                placeholder="Cantidad"
                            />
                            <button className="btn mt-4" onClick={createComponent}>
                                Añadir
                            </button>
                            {confirmMessage && <div role="alert" className="alert alert-success mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{confirmMessage}</span>
                                <button onClick={clearMessage} className="btn btn-sm btn-circle btn-ghost">✕</button>
                            </div>}
                        </div>
                    </div>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Componentes</th>
                                <th>Cantidad</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.component_value.map((component, index) => {
                                const [ingredient, quantity] = component.split(' = ');
                                return (
                                    <tr className="hover" key={index}>
                                        <td>{ingredient}</td>
                                        <td>{quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecipeComponent;