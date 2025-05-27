import RecipeAddModalComponent from "./RecipeAddModalComponent";

const RecipeComponent = ({ productId, recipe, components, user, deleteComponet, onComponentAdded }) => {
    if (!recipe) return <div className="flex justify-center">Cargando...</div>

    return (
        <>
            <h2 className="text-center text-xl font-bold underline mb-4">{recipe.product}</h2>
            
            <RecipeAddModalComponent
                productId={productId}
                components={components}
                onComponentAdded={onComponentAdded}
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
        </>
    );
};

export default RecipeComponent;