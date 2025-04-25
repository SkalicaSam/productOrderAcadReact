import React, { useEffect, useState, useRef } from "react";
import { Product } from "../types";
import { getProducts, deleteProduct } from "../services/api";
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

interface ProductListProps {
    refresh: number;
}

export const ProductList: React.FC<ProductListProps> = ({ refresh }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const cartRef = useRef<any>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts()
            setProducts(response.data)
        }
        fetchProducts()
    }, [refresh]);

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Chyba při mazání produktu:', error);
        }
    };

    const addToCart = async (product: Product) => {
        if (cartRef.current) {
            await cartRef.current.addToCart(product);
        }
    };

    return (
        <div>
            <h2>Product List :</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`} >
                            {product.name}
                        </Link>
                        , <> product  price:   </>{product.price}
                        <button onClick={() => handleDelete(product.id)}>Smazat</button>
                        <button onClick={() => addToCart(product)}>Přidat do košíku</button>

                    </li>
                ))}
            </ul>
            <Cart ref={cartRef} />
        </div>
    )
}

export default ProductList;