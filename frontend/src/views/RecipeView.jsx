import { useEffect, useState } from 'react';
import api from '../api/api.jsx';
import { sortData } from '../utils';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser.jsx';

import RecipeComponent from '../components/Recipes/RecipeComponent';
import RecipeTable from '../components/Recipes/RecipeTable.jsx';

const RecipeView = () => {
    const [productList, setProductList] = useState([]);
    const [components, setComponents] = useState([]);
    const [recipe, setRecipe] = useState(null);
    
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [productId, setProductId] = useState(null);
    
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

    const deleteComponent = async (componentLabel) => {
        await api.delete(`/product/api/${productId}/${componentLabel}`);
        await getRecipe(productId);
        await getComponents(); 
    };

    const sortedProducts = sortData(productList, sortConfig);

    return (
      <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
        <aside className="lg:col-span-2">
          <RecipeTable
            products={sortedProducts}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            onViewClick={(id) => {
              setProductId(id);
            }}
          />
        </aside>

        <main className="lg:col-span-6">
          <h2 className="text-center text-xl font-bold underline mb-4">Recetas</h2>
          <RecipeComponent
            productId={productId}
            recipe={recipe}
            components={components}
            user={user}
            deleteComponent={deleteComponent}
            onComponentAdded={() => getRecipe(productId)}
          />
        </main>

      </div>
    </div>
    );
};

export default RecipeView;

