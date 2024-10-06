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
        <div className="">
            <div className="">
                <div className="">
                    <h2 className="font-bold uppercase text-3xl text-center w-full mb-8">{recipe.product}</h2>
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