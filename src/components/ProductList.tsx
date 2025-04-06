import React from "react";
import { Product } from "../types";
import { getProducts } from "../services/api";
import { useEffect, useState } from 'react'

export const ProductList: React.FC = () => {
    const [ products, setProducts ] = useState<Product[]>([])

     useEffect(() => {
                const fetchProducts = async () => {
                    const response = await getProducts()
                    setProducts(response.data)
                }
                fetchProducts()
            }, );

    return (
        <div>
            <h2>Product List :</h2>

            <ul>
                 {products.map((product) => (
                      <li key={product.id}>{product.name}, <> product  price:   </>{product.price}</li>
                  ))}
             </ul>
        </div>
    )
}

export default ProductList