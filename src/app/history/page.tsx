'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  vendorName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would fetch from the API
        // For now, we'll use mock data
        const mockOrders: Order[] = [
          {
            _id: '1',
            vendorName: 'Homely Tiffins',
            items: [
              { name: 'Veg Thali', price: 120, quantity: 2 },
              { name: 'Paneer Special', price: 150, quantity: 1 },
            ],
            totalAmount: 390,
            status: 'delivered',
            createdAt: '2023-06-15T10:30:00Z',
          },
          {
            _id: '2',
            vendorName: 'Mom\'s Kitchen',
            items: [
              { name: 'Dal Makhani', price: 100, quantity: 1 },
              { name: 'Chole Bhature', price: 130, quantity: 1 },
            ],
            totalAmount: 230,
            status: 'pending',
            createdAt: '2023-06-18T12:45:00Z',
          },
        ];
        
        setOrders(mockOrders);
      } catch (err) {
        setError('Failed to load order history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading order history...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-4">
            You haven't placed any orders yet. Start ordering delicious tiffin meals now!
          </p>
          
          <Link href="/" className="btn-primary inline-block">
            Browse Vendors
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{order.vendorName}</h2>
                    <p className="text-gray-500 text-sm">
                      Ordered on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                <div className="border-t border-b py-4 my-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">₹{order.totalAmount}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3">
                <Link
                  href={`/vendor/${order._id}`}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Order Again
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}