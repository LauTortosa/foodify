import api from '../../api/api.jsx';
import { useState } from "react";

import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import AlertComponent from "../AlertComponent";

const RecipeAddModalComponent = ({ productId, components, onComponentAdded }) => {
    const [selectedComponent, setSelectedComponent] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const username = useAuthenticatedUser();

    const extractErrorMessages = (error) => {
        const data = error.response?.data;
        if (typeof data?.detail === 'string') {
            return [data.detail];
        } else if (Array.isArray(data?.detail)) {
            return data.detail.map(item => item.msg || 'Error desconocido');
        } else {
            return [data?.msg || error.message || 'Error desconocido'];
        }
    };
    
    const createComponent = async (data) => {
        try {
            const dataToSend = {
                product_id: productId,
                component_id: selectedComponent,
                kilograms: quantity,
            };

            await api.post('/product/api/component-product', dataToSend);
            setSelectedComponent("");
            setQuantity(0);
            setSuccessMessage("Componente añadido con éxito");
            setWarningMessage("");

            if (onComponentAdded) {
                onComponentAdded();
            }
        
        } catch (error) {
            console.log(error.response?.data); 
            const messages = extractErrorMessages(error);
            setWarningMessage(messages);
            setSuccessMessage("");
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
            {username === 'gestion' && (
                <label 
                    htmlFor={`modal-add-component-${productId}`} 
                    className="btn btn-sm btn-ghost mb-4"
                >
                <span>➕</span>
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
                            onClick={clearMessages}
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
                    <button 
                        type='button'
                        className="btn mt-4" 
                        onClick={createComponent}
                    >
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
                            warningMessage.map((msg, index) => {
                                return (
                                    <AlertComponent 
                                        key={index}   
                                        type="warning"
                                        message={msg}
                                        onClose={clearMessages}
                                    />
                                );
                            })
                
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeAddModalComponent;