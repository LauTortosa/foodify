import { handleSort } from "../../utils";

const RecipeTable = ({ products, sortConfig, setSortConfig, onViewClick }) => {
    return(
        <div className='overflow-x-auto mb-24 p-4'>
            <table className="table">
                <thead>
                    <tr>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'product')}>Producto</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'type_product')}>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                  <tr key={product.id} className="hover">
                    <td className="cursor-pointer" onClick={() => onViewClick(product.id)}>{product.product}</td>
                    <td>{product.type_value}</td>
                  </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipeTable;