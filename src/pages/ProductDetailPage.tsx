import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { getProduct } from '../services/api';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Chyba při načítání produktu:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Načítání...</div>;
    }

    return (
        <div>
            <h2>Detail produktu</h2>
            <h3>{product.name}</h3>
            <p>Cena: {product.price}</p>
            <p>Popis: {product.description}</p>
            <p>Množství: {product.amount}</p>
        </div>
    );
};

export default ProductDetailPage;