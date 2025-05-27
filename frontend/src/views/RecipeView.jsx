import { useEffect, useState } from 'react';
import { sortData } from '../utils';
import api from '../api/api.jsx';
import RecipeComponent from '../components/Recipes/RecipeComponent';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser.jsx';
import RecipeTable from '../components/Recipes/RecipeTable.jsx';

const RecipeView = () => {
    const [productList, setProductList] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [productId, setProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [components, setComponents] = useState([]);
    const user = useAuthenticatedUser();

    useEffect(() => {
        getProducts();
        getComponents();
    }, []);

    useEffect(() => {
        getComponents();
        if (productId) {
            getRecipe(productId);
        }
    }, [productId]);

    const getComponents = async () => {
        try {
            const response = await api.get('/product/api/component');
            setComponents(response.data);
        } catch (error) {
            console.error('Error fetching components:', error);
        }
    };

    const getProducts = async () => {
        try {
            const response = await api.get('/product/api/list');
            setProductList(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getRecipe = async (productId) => {
        try {
            const response = await api.get(`/product/api/${productId}`);
            setRecipe(response.data);
        } catch (error) {
            console.error('Error fetching recipe:', error.response.data);
        }
    };

    const deleteComponet = async (componentLabel) => {
        await api.delete(`/product/api/${productId}/${componentLabel}`);
        await getRecipe(productId);
        await getComponents(); 
    };

    const sortedProducts = sortData(productList, sortConfig);

    return (
      <div className='container mx-auto px-4 py-6 min-h-screen'>
        <h2 className='text-center text-xl font-bold underline mt-4 mb-4'>Lista de recetas</h2>
        
        <RecipeTable
            products={sortedProducts}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            onViewClick={(productId) => {
                setProductId(productId);
                setIsModalOpen(true);
            }}
        />

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
                      <RecipeComponent 
                        productId={productId}
                        recipe={recipe}
                        components={components}
                        user={user}
                        deleteComponet={deleteComponet} 
                        onComponentAdded={() => getRecipe(productId)}   
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
    );
};

export default RecipeView;

