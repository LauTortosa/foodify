import axios from "axios";
import { useEffect, useState } from "react"

const RecipeComponent = ({ productId }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        if (productId) {
            getRecipe(productId);
        }
    }, [productId]);

    const getRecipe = async (productId) => {
        const response = await axios.get(`http://localhost:8000/product/api/${productId}`);
        setRecipe(response.data);
    }

    if (!recipe) {
        return <p>Selecciona un producto para ver la receta.</p>;
    }

    return (
        <div>
            <div>
                <h3>{recipe.product}</h3>
                <h3>{recipe.type_value}</h3>
                <ul>
                    {recipe.component_value.map((component, index) => (
                        <li key={index}>{component}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RecipeComponent;