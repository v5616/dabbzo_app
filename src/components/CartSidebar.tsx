'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, vendorName, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();
  
  return (
    <>
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 transition-colors z-50"
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </div>
      </button>
      
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* Cart Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="mt-2 text-gray-500">Your cart is empty</p>
                <button
                  onClick={toggleCart}
                  className="mt-4 text-red-500 hover:text-red-600"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    Ordering from: <span className="font-medium">{vendorName}</span>
                  </p>
                </div>
                
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-4 border-b"
                  >
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                      >
                        -
                      </button>
                      <span className="mx-2 w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="ml-4 text-red-500 hover:text-red-600"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">₹{totalPrice}</span>
              </div>
              
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="btn-primary w-full block text-center"
                  onClick={toggleCart}
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="btn-secondary w-full"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
}