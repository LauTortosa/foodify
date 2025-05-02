import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

            await axios.post('http://localhost:8000/product/api/component-product', dataToSend);
            setSelectedComponent("");
            setQuantity(0);
            setSuccessMessage("Componente añadido con éxito");
        
        } catch (error) {
            let errorMessages = [];
            console.log(error.response?.data); 
            //if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
            //    errorMessages = error.response.data.detail.map(err => err.msg);
            //} else {
            //    errorMessages.push(error.response?.data?.msg || error.message || "Error al añadir la planificación.");
            //}

            if (typeof error.response?.data?.detail === 'string') {
                errorMessages.push(error.response.data.detail);
            }
            // Verificar si el detalle es un array de objetos
            else if (Array.isArray(error.response?.data?.detail)) {
                error.response.data.detail.forEach(item => {
                    if (item.msg) {
                        errorMessages.push(item.msg);
                    }
                });
            }
            setWarningMessage(errorMessages);
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
    )
}

export default RecipeAddModalComponent;