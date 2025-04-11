import React from "react";
import { useEffect, useState } from 'react'
import { Product } from "../types";
import { getProducts } from "../services/api";
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';

export const ProductPage: React.FC = () => {
       const [ products, setProducts ] = useState<Product[]>([])
       const [ refresh, setRefresh] = useState(0)
       const [error, setError] = useState<string | null>(null)

        const handleProductAdded = () => {
                setRefresh(prev => prev + 1);
        }

    return (
        <div>
            <h1>Product Page </h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                 <ProductList refresh={refresh}/>
            </div>
            <div>
                 <AddProduct onProductAdded={handleProductAdded}/>
            </div>
        </div>
    )
}