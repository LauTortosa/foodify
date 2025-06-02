import RecipeAddModalComponent from "./RecipeAddModalComponent";

const RecipeComponent = ({ productId, recipe, components, user, deleteComponet, onComponentAdded }) => {
    if (!recipe) return <div className="flex justify-center">Cargando...</div>

    return (
        <>
        <RecipeAddModalComponent
                productId={productId}
                components={components}
                onComponentAdded={onComponentAdded}
            />
            <h2 className="text-xl font-bold underline mb-4 ml-2">{recipe.product}</h2>
            
            
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Componentes</th>
                        <th>Cantidad</th> 
                        {user === 'gestion' && (
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
                                {user === 'gestion' && (
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-ghost"
                                            onClick={() => deleteComponet(ingredient)}>
                                                🗑️
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default RecipeComponent;