'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TrackingPage({ params }: { params: { id: string } }) {
  interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  estimatedDelivery: string;
  items: OrderItem[];
  total: number;
  vendor: {
    name: string;
    address: string;
  };
  deliveryAddress: string;
  driverName: string;
  driverPhone: string;
}

const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order data
    const fetchOrder = async () => {
      try {
        // In a real implementation, this would fetch from your API
        // const response = await fetch(`/api/orders/${params.id}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockOrder = {
          id: params.id,
          status: 'On the way',
          estimatedDelivery: '12:45 PM',
          vendor: {
            name: 'Tasty Tiffin',
            address: '123 Food Street, Foodville'
          },
          deliveryAddress: '456 Home Avenue, Homeville',
          items: [
            { name: 'Dal Makhani', quantity: 1, price: 120 },
            { name: 'Paneer Butter Masala', quantity: 1, price: 150 },
            { name: 'Roti', quantity: 4, price: 40 }
          ],
          total: 310,
          driverName: 'Raj Kumar',
          driverPhone: '+91 98765 43210'
        };
        
        setTimeout(() => {
          setOrder(mockOrder);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Track Your Order
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Order #{order?.id}</h2>
            <p className="text-gray-600">From {order?.vendor?.name}</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            {order?.status}
          </div>
        </div>
        
        <div className="border-t border-gray-200 my-4 pt-4">
          <p className="text-gray-700">
            <span className="font-medium">Estimated Delivery:</span> {order?.estimatedDelivery}
          </p>
        </div>
      </div>
      
      {/* Map Section - Coming Soon */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-700">Live Tracking Coming Soon!</h3>
            <p className="text-gray-500 mt-2 text-center max-w-md">
              We&apos;re working on integrating real-time GPS tracking with Google Maps.
              Soon you&apos;ll be able to track your tiffin delivery in real-time!
            </p>
          </div>
        </div>
        <div className="h-64"></div>
      </div>
      
      {/* Delivery Info */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Pickup From</p>
            <p className="font-medium">{order?.vendor?.name}</p>
            <p className="text-gray-700">{order?.vendor?.address}</p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-1">Deliver To</p>
            <p className="font-medium">Your Address</p>
            <p className="text-gray-700">{order?.deliveryAddress}</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-1">Delivery Partner</p>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">{order?.driverName}</p>
              <p className="text-gray-700">{order?.driverPhone}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-3 mb-6">
          {order?.items?.map((item: OrderItem, index: number) => (
            <div key={index} className="flex justify-between">
              <div>
                <span className="font-medium">{item.quantity}x </span>
                {item.name}
              </div>
              <div>₹{item.price}</div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between font-bold text-lg">
            <div>Total</div>
            <div>₹{order?.total}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/history" className="btn-secondary inline-block">
          Back to Order History
        </Link>
      </div>
    </div>
  );
}