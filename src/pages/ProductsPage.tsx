import React from "react";
import { useEffect, useState } from 'react'
import { Product } from "../types";
import { getProducts } from "../services/api";
import AddProduct from '../components/AddProduct';

export const ProductPage: React.FC = () => {
       const [ products, setProducts ] = useState<Product[]>([])
       const [ refresh, setRefresh] = useState(0)
       const [error, setError] = useState<string | null>(null)
    
        useEffect(() => {
            const fetchProducts = async () => {
                const response = await getProducts()
                setProducts(response.data)
            }
            fetchProducts()
        }, [refresh]);

        const handleProductAdded = () => {
                setRefresh(prev => prev + 1);
        }

    return (
        <div>
            <h1>Product Page </h1>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}, <> product  price:   </>{product.price}</li>
                ))}
            </ul>

            <div>
                 <AddProduct onProductAdded={handleProductAdded} />
            </div>
        </div>
    )
}