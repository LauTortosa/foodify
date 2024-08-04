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
    
    if (!recipe) {
        return ( 
            <div className="flex justify-center"></div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="card shadow-xl mt-8">
                <div className="card-body">
                    <h2 className="card-title uppercase justify-center text-3xl w-full mb-4">{recipe.product}</h2>
                    <ul>
                        {recipe.component_value.map((component, index) => {
                            const [ingredient, quantity] = component.split(' = ');
                            return (
                                <li key={index} className="text-xl">
                                    <p className="px-4 py-2">{ingredient} = {quantity}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecipeComponent;