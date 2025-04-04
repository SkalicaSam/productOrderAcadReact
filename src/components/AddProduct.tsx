import React, { useState } from 'react';
import { addProduct } from '../services/api';
import { Product } from "../types";




const AddProduct: React.FC = () => {

  const [ products, setProducts ] = useState<Product[]>([])

  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState('')



 const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('submitting')
        try {
            await addProduct(name, price)
            setName('')
            setPrice('')
            console.log('submitted successfully')

   } catch (error) {
       console.error('Chyba při přidávání produktu:', error);
     }
 }
    

    return(
        <div>
             <h2>Přidat nový produkt</h2>

             <form onSubmit={handleSubmit}>
                             <div>Add Products</div>
                         <div>
                             <label>Name: </label>
                             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                         </div>
                         <div>
                            <label>Price: </label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                          </div>


                         <button type="submit">Add product</button>
             </form>
        </div>
     )
}

export default AddProduct