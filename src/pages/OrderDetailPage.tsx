import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/api';
import { Order } from '../types';

const OrderDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getOrderById(id);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <div>
            <h1>Order Details</h1>
            <h2>Order ID: {order.orderId}</h2>
            <p>Paid: {order.paid ? 'Yes' : 'No'}</p>
            <h3>Shopping List:</h3>
            {order.shoppingList && order.shoppingList.length > 0 ? (
                <ul>
                    {order.shoppingList.map(item => (
                        <li key={item.id}>
                            Product ID: {item.productId}, Amount: {item.amount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in shopping list</p>
            )}
        </div>
    );
};

export default OrderDetailPage;