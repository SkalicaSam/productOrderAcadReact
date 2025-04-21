import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getOrders, getOrderById } from '../services/api';
import { Order } from '../types';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchId, setSearchId] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Order | null>(null);
    const [error, setError] = useState<string | null>(null);


        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await getOrders();
                    setOrders(response.data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                } finally {
                    setLoading(false);
                }
            };


            fetchOrders();
        }, []);

    const handleSearch = async () => {
        if (searchId) {
            try {
                const response = await getOrderById(searchId);
                if (response.status === 200 && response.data) {
                    setSearchResult(response.data);
                    setError(null);
                } else {
                    setSearchResult(null);
                    setError('Order not found');
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Order not found');
                } else {
                    setError('An error occurred while fetching the order');
                }
                setSearchResult(null);
            }
        }
    };

        if (loading) {
            return <div>Loading...</div>;
        }

    return (
        <div>
            <h1>Orders</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by Order ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {searchResult ? (
                <div>
                    <h2>Order ID: {searchResult.orderId}</h2>
                    <p>Paid: {searchResult.paid ? 'Yes' : 'No'}</p>
                    <h3>Shopping List:</h3>
                    <ul>
                        {searchResult.shoppingList.map(item => (
                            <li key={item.id}>
                                Product ID: {item.productId}, Amount: {item.amount}
                            </li>
                        ))}
                    </ul>
                    <Link to={`/order/${searchResult.orderId}`}>
                        <button>Order Details</button>
                    </Link>
                </div>
            ) : (


                <ul>
                    {orders.map(order => (
                        <li key={order.orderId}>
                            <h2>Order ID: {order.orderId}</h2>
                            <p>Paid: {order.paid ? 'Yes' : 'No'}</p>
                            <h3>Shopping List:</h3>
                            <ul>
                                {order.shoppingList.map(item => (
                                    <li key={item.id}>
                                        Product ID: {item.productId}, Amount: {item.amount}
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/order/${order.orderId}`}>
                                <button>Order Details</button>
                            </Link>
                        </li>
                    ))}
                </ul>
                 )}
        </div>
    );
};

export default Orders;
