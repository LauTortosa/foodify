import axios from "axios";
import { useEffect, useState } from "react";

const ChecksProductsComponent = ({ setSelectedProducts }) => {
    const [types, setTypes] = useState([]);
    const [productsByType, setProductsByType] = useState({});

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        const response = await axios.get('http://localhost:8000/product/api/types');
        const typesData = response.data;
        setTypes(typesData);

        const productsData = await Promise.all(
            typesData.map(async (type) => {
                const productsResponse = await axios.get(`http://localhost:8000/product/api/products?type_id=${type.id}`);
                return {
                    typeId: type.id,
                    products: productsResponse.data
                };
            })
        );

        // organice products by type
        if (Array.isArray(productsData)) {
            const updatedProductsByType = {};
            productsData.forEach(({ typeId, products }) => {
                updatedProductsByType[typeId] = products.map(product => ({
                    ...product,
                    checked: false
                }));
            });
            setProductsByType(updatedProductsByType);
        }
    };

    const handleCheckboxChange = (typeId, productId) => {
        setProductsByType(prevProductsByType => {
            const updatedProducts = prevProductsByType[typeId].map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        checked: !product.checked
                    };
                }
                return product;
            });
            return {
                ...prevProductsByType,
                [typeId]: updatedProducts
            };
        });

        setSelectedProducts(prevSelectedProducts => {
        if (prevSelectedProducts.includes(productId)) {
                return prevSelectedProducts.filter(id => id !== productId);
            } else {
                return [...prevSelectedProducts, productId];
            }
        });
    };

    return (
        <div>
            {types.map(type => (
                <div key={type.id}>
                    <h3 className="font-bold">{type.label}</h3>
                    <ul>
                        {productsByType[type.id]?.map(product => (
                            <li key={product.id}>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={product.checked}
                                        onChange={() => handleCheckboxChange(type.id, product.id)}
                                        className="checkbox mt-2 mr-2"
                                    />
                                    <span>{product.product}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
};

export default ChecksProductsComponent;