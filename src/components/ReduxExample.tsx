'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addItem, removeItem, selectCartItems, selectCartTotal } from '@/redux/features/cartSlice';

export default function ReduxExample() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  
  const handleAddToCart = () => {
    if (!productName || !productPrice) return;
    
    dispatch(addItem({
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1,
      vendorId: 'example-vendor',
      vendorName: 'Example Vendor'
    }));
    
    // Reset form
    setProductName('');
    setProductPrice('');
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Redux Toolkit Example</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Item to Cart</h3>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Cart Items (from Redux Store)</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-2">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2">
                      {item.quantity} x ₹{item.price}
                    </span>
                  </div>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <p className="font-bold">Total: ₹{cartTotal.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}