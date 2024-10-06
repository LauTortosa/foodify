import { useEffect, useState } from 'react';
import { sortData, handleSort } from '../utils';
import axios from 'axios';

import Navbar from '../components/Navbar';
import RecipeComponent from '../components/Recipes/RecipeComponent';

const RecipeView = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productList, setProductList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const sortedProducts = sortData(productList, sortConfig);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:8000/product/api/list');
    setProductList(response.data);
  }

  const handleViewClick = (productId) => {
    setSelectedProductId(productId);
    document.getElementById('my_modal_3').showModal();
  };


  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div>
          <Navbar />
        </div>
          <div className='md:col-span-2 lg:col-span-3'>
            <h2 className='text-center text-xl font-bold underline mt-4 mb-4'>Lista de recetas</h2>
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
                {sortedProducts.map((product, index) => (
                    <tr key={product.id} className="hover">
                        <td>{index + 1}</td>
                        <td>{product.product}</td>
                        <td>{product.type_value}</td>
                        <td>
                          <button className="btn btn-sm btn-ghost" onClick={() => handleViewClick(product.id)}>Ver datos</button>
                          <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                              </form>
                              <h2 className='text-xl text-center font-bold underline mb-4'>Datos de la receta</h2>
                              <RecipeComponent productId={selectedProductId} />
                              </div>
                          </dialog>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;