 import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
 import { Product } from '../types';
 import { getProductAmount } from '../services/api';

 interface CartItem extends Product {
   quantity: number;
 }

const Cart = forwardRef((props, ref) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useImperativeHandle(ref, () => ({
    addToCart: async (product: Product) => {
      try {
        const response = await getProductAmount(product.id);
        const maxAmount = response.data.amount;

        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
          if (existingItem.quantity < maxAmount) {
            setCartItems(prevItems =>
              prevItems.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            );
          } else {
            alert('Dosáhli jste maximálního množství pro tento produkt.');
          }
        } else {
          setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
        }
      } catch (error) {
        console.error('Chyba při získávání množství produktu:', error);
      }
    }
  }));

  const removeFromCart = (item: CartItem) => {
      setCartItems(prevItems => prevItems.filter(i => i.id !== item.id));
    }

  const removeOneQuantityFromCart = (itemId: number) => {
    setCartItems(prevItems =>
        prevItems.map(item =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ).filter(item => item.quantity > 0)
        );
  };

  return (
    <div>
      <h3>Košík</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - Množství: {item.quantity}
            <button onClick={() => removeFromCart(item)}>Odebrat z košíku</button>
             <button onClick={() => removeOneQuantityFromCart(item.id)}>Remove one</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Cart;