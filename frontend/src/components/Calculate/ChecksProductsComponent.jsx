import { useProductsByType } from "../../hooks/useProductsByType";

const ChecksProductsComponent = ({ setSelectedProducts }) => {
    const { types, productsByType, setProductsByType } = useProductsByType();

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
                    <h3 className="font-bold mt-4">{type.label}</h3>
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