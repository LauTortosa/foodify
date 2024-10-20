import axios from "axios";
import { useEffect, useState } from "react";

import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import RecipeAddModalComponent from "./RecipeAddModalComponent";

const RecipeComponent = ({ productId }) => {
    const [recipe, setRecipe] = useState(null);
    const [components, setComponents] = useState([]);
    const user = useAuthenticatedUser();

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

    const deleteComponet = async (componentLabel) => {
        await axios.delete(`http://localhost:8000/product/api/${productId}/${componentLabel}`);
        await getRecipe(productId);
        await getComponents(); 
    };

    useEffect(() => {
        getComponents();
    }, []);

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

    return (
        <div className="">
            <div className="">
                <div className="">
                    <h2 className="font-bold uppercase text-3xl text-center w-full mb-8">{recipe.product}</h2>
                    <RecipeAddModalComponent
                        productId={productId}
                        components={components}
                    />
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Componentes</th>
                                <th>Cantidad</th> 
                                {user === 'responsable' && (
                                    <th>Acciones</th>                            
                                )}                           
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.component_value.map((component, index) => {
                                const [ingredient, quantity] = component.split(' = ');
                                return (
                                    <tr className="hover" key={index}>
                                        <td>{ingredient}</td>
                                        <td>{quantity}</td>
                                        {user === 'responsable' && (
                                            <td>
                                                <button 
                                                className="btn btn-sm btn-ghost"
                                                onClick={() => deleteComponet(ingredient)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        )}
                                        
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