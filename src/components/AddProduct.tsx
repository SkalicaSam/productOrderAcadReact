import React, { useState } from 'react';
import { addProduct } from '../services/api';
import { Product } from "../types";


interface AddProductProps {
    onProductAdded?: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState<number | ''>('')
    const [error, setError] = useState<string | null>(null)

     const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            console.log('submitting')
            setError(null)

            if (!name || !price) {
                setError('Prosím vyplňte všechny pole.');
                return;
            }

            if (!name || price <= 0) {
              setError('Prosím vyplňte všechna pole správně. Cena musí být kladné číslo.');
              return;
            }

            try {
                await addProduct(name, price)
                setName('')
                setPrice('')
                console.log('submitted successfully')
                if (onProductAdded) onProductAdded()

            } catch (error) {
                setError('Chyba při přidávání produktu. Zkuste to prosím znovu.')
                console.error('Chyba při přidávání produktu:', error);
            }
     }

    return(
        <div>
             <h2>Přidat nový produkt</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}

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