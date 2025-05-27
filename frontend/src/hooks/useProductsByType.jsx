import { useEffect, useState } from "react";
import api from "../api/api.jsx"

export const useProductsByType = () => {
    const [types, setTypes] = useState([]);
    const [productsByType, setProductsByType] = useState({});

    useEffect(() => {
        const getTypes = async () => {
            const response = await api.get('/product/api/types');
            const typesData = response.data;
            setTypes(typesData);

            const productsData = await Promise.all(
                typesData.map(async (type) => {
                    const productsResponse = await api.get(`/product/api/products?type_id=${type.id}`);
                    return {
                        typeId: type.id,
                        products: productsResponse.data
                    };
                })
            );

            // organice products by type
            const updatedProductsByType = {};
            productsData.forEach(({ typeId, products }) => {
                updatedProductsByType[typeId] = products.map(product => ({
                    ...product,
                    checked: false
                }));
            });
            setProductsByType(updatedProductsByType);

        };
            
        getTypes();
    }, []);

    return { types, productsByType, setProductsByType };
};

export default useProductsByType;