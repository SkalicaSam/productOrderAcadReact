import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { getProduct, deleteProduct } from '../services/api';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        try {
            await deleteProduct(Number(id));
//             console.log('Produkt byl smazán.');
            navigate('/products'); // Přesměrování na seznam produktů po úspěšném smazání
        } catch (error) {
            console.error('Chyba při mazání produktu:', error);
        }
    };

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
            <Link to={`/product/edit/${id}`}>
                            <button>Upravit</button>
            </Link>
            <button onClick={handleDelete}>Smazat</button>

        </div>
    );
};

export default ProductDetailPage;