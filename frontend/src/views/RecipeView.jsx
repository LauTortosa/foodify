import { useEffect, useState } from 'react';
import { sortData, handleSort } from '../utils';
import axios from 'axios';

import apiClient from "@/components/apiClient"
import RecipeComponent from '../components/Recipes/RecipeComponent';

const RecipeView = () => {
    const [productList, setProductList] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await apiClient.get('/product/api/list');
            setProductList(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const sortedProducts = sortData(productList, sortConfig);

    return (
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          <div className='md:col-span-2 lg:col-span-1'></div>
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
                      <button className="btn btn-sm btn-ghost" 
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setIsModalOpen(true);
                      }}>
                        Ver datos
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isModalOpen && (
              <div>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal modal-open">
                  <div className="modal-box relative">
                    <label 
                      htmlFor="my-modal-3" 
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      ✕
                    </label>
                      <RecipeComponent productId={selectedProductId} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default RecipeView;

