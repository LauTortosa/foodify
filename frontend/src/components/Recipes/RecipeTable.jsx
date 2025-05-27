import { handleSort } from "../../utils";

const RecipeTable = ({ products, sortConfig, setSortConfig, onViewClick }) => {
    return(
        <div className='overflow-x-auto ml-24 mb-24'>
            <table className="table">
                <thead>
                    <tr>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'index')}>#</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'product')}>Producto</th>
                        <th className='cursor-pointer' onClick={() => handleSort(sortConfig, setSortConfig, 'type_product')}>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                  <tr key={product.id} className="hover">
                    <td>{index + 1}</td>
                    <td>{product.product}</td>
                    <td>{product.type_value}</td>
                    <td>
                      <button className="btn btn-sm btn-ghost" 
                      onClick={() => onViewClick(product.id)}>
                        Ver datos
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipeTable;