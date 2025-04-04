import React from "react";
import { useEffect, useState } from 'react'
import { Author, Product } from "../types";
import { addAuthor, getAuthors, getProducts } from "../services/api";
import AddProduct from '../components/AddProduct';

export const ProductPage: React.FC = () => {
       const [ products, setProducts ] = useState<Product[]>([])


//        const [ name, setName ] = useState('')
       const [ refresh, setRefresh] = useState(0)
    
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



//        const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         console.log('somt u')
//         await addAuthor(name)
//         setName('')
//         setRefresh((prev) => prev +1 )
//        }


    return (



        <div key={refresh}>
            <h1>Product Page </h1>



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