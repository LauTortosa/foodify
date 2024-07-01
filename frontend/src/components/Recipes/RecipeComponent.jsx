import axios from "axios";
import { useEffect, useState } from "react"

const RecipeComponent = ({ productId }) => {
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        const getRecipe = async (productId) => {
            const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
            setRecipe(response.data);
        }

        if (productId) {
            getRecipe(productId);
        }
    }, [productId]);
    
    console.log('recipe', recipe);
    if (!recipe) {
        return (
            <div className="flex justify-center">
            <div className="card bg-base-100 w-100 shadow-xl">
                <div className="card-body">
                <p className="text-lg text-center">Selecciona un producto para ver la receta</p>
                </div>
            </div>
        </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title uppercase justify-center">{recipe.product}</h2>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Ingrediente</th>
                                <th className="px-4 py-2">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.component_value.map((component, index) => {
                                const [ingredient, quantity] = component.split(' = ');
                                return (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{ingredient}</td>
                                        <td className="border px-4 py-2">{quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RecipeComponent;