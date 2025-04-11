import React from "react";
import { Product } from "../types";
import { getProducts, deleteProduct } from "../services/api";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

interface ProductListProps {
    refresh: number;
}

export const ProductList: React.FC<ProductListProps> = ({ refresh }) => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const navigate = useNavigate();

     useEffect(() => {
                const fetchProducts = async () => {
                    const response = await getProducts()
                    setProducts(response.data)
                }
                fetchProducts()
            }, [refresh] );

    const handleDelete = async (id: number) => {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                console.error('Chyba při mazání produktu:', error);
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
                      </li>
                  ))}
             </ul>
        </div>
    )
}

export default ProductList