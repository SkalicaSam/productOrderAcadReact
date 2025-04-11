import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/api';

interface ProductEditData {
    name: string;
    description: string;
}

export const ProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [productData, setProductData] = useState<ProductEditData>({
        name: '',
        description: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                const { name, description } = response.data;
                setProductData({
                                name: name || '',
                                description: description || '',
                            });
            } catch (error) {
                console.error('Chyba při načítání produktu:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('productData', productData);
            await updateProduct(Number(id), productData);
            navigate(`/product/${id}`);
        } catch (error) {
            console.error('Chyba při aktualizaci produktu:', error);
        }
    };

    return (
        <div>
            <h2>Upravit produkt</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Název:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Popis:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Uložit změny</button>
            </form>
        </div>
    );
};

export default ProductEditPage;