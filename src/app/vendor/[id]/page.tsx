'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Vendor {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  menu: MenuItem[];
}

export default function VendorDetails({ params }: { params: { id: string } }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addItem, items } = useCartStore();
  
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        // In a real app, this would fetch from the API
        // For now, we'll use mock data
        const mockVendor = {
          _id: params.id,
          name: params.id === '1' ? 'Homely Tiffins' : 'Sample Vendor',
          description: 'Authentic home-cooked meals delivered fresh daily',
          image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1000&auto=format&fit=crop',
          rating: 4.5,
          address: '123 Food Street, Foodville',
          menu: [
            {
              _id: '101',
              name: 'Veg Thali',
              description: 'Rice, dal, 2 sabzi, roti, salad, and pickle',
              price: 120,
              image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop',
            },
            {
              _id: '102',
              name: 'Paneer Special',
              description: 'Paneer curry with 3 rotis and rice',
              price: 150,
              image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop',
            },
            {
              _id: '103',
              name: 'Dal Makhani',
              description: 'Creamy dal with 3 rotis',
              price: 100,
              image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop',
            },
            {
              _id: '104',
              name: 'Chole Bhature',
              description: 'Spicy chole with 2 bhature',
              price: 130,
              image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop',
            },
          ],
        };
        
        setVendor(mockVendor);
      } catch (err) {
        setError('Failed to load vendor details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendor();
  }, [params.id]);
  
  const handleAddToCart = (item: MenuItem) => {
    if (vendor) {
      addItem(vendor._id, vendor.name, item);
    }
  };
  
  const isItemInCart = (itemId: string) => {
    return items.some(item => item._id === itemId);
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading vendor details...</div>;
  }
  
  if (error || !vendor) {
    return <div className="text-center py-10 text-red-500">{error || 'Vendor not found'}</div>;
  }
  
  return (
    <div className="container-custom py-8">
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        <img 
          src={vendor.image} 
          alt={vendor.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
          <p className="text-gray-200 mb-3 max-w-2xl">{vendor.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{vendor.rating}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{vendor.address}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Menu</h2>
          <p className="text-gray-600 mb-6 md:mb-0">Choose from our delicious selection of freshly prepared meals</p>
        </div>
        <div className="mb-4 md:mb-0">
          <a href={`/subscription/${params.id}`} className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <span>Subscribe to Daily Meals</span>
            <span className="ml-2 bg-white text-green-600 text-xs px-1.5 py-0.5 rounded-full font-medium">Coming Soon</span>
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vendor.menu.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden flex hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-32 w-32 bg-gray-200 flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">₹{item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    isItemInCart(item._id)
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white'
                  }`}
                >
                  {isItemInCart(item._id) ? (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Added
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Cart
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}