import { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../apiClient";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import AlertComponent from "../AlertComponent";

const RecipeAddModalComponent = ({ productId, components }) => {
    const [selectedComponent, setSelectedComponent] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const navigate = useNavigate();
    const username = useAuthenticatedUser();
    
    const createComponent = async (data) => {
        try {
            const dataToSend = {
                product_id: productId,
                component_id: selectedComponent,
                kilograms: quantity,
            };

            await apiClient.post('/product/api/component-product', dataToSend);
            setSelectedComponent("");
            setQuantity(0);
            setSuccessMessage("Componente añadido con éxito");
        } catch (error) {
            if (error.response?.status === 409) {
                setWarningMessage("El componente ya existe para este producto");
            } else {
                console.error("Error: ", error.response?.data || error.message);
            }
        }
    };

    const handleComponentChange = (e) => {
        setSelectedComponent(e.target.value);
    };

    const clearMessages = () => {
        setSuccessMessage("");
        setWarningMessage("");
    };

    return (
        <>
            {username === 'responsable' && (
                <label 
                htmlFor={`modal-add-component-${productId}`} 
                className="btn mb-8">
                Añadir Componente
            </label>
            )}
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
                    <div>
                        {successMessage && (
                            <AlertComponent 
                                type="success"
                                message={successMessage}
                                onClose={clearMessages}
                            />    
                        )}
                    </div>
                    <div>
                        {warningMessage && (
                            <AlertComponent 
                                type="warning"
                                message={warningMessage}
                                onClose={clearMessages}
                            />    
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeAddModalComponent;