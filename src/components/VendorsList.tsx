"use client";

import { useState } from 'react';
import Link from 'next/link';

// Duplicating the interface for clarity, but could be shared
interface Vendor {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  cuisineType: string;
  deliveryTime: string;
  minOrder: number;
}

interface VendorsListProps {
  vendors: Vendor[];
}

export default function VendorsList({ vendors }: VendorsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');

  const cuisineTypes = ['All', 'North Indian', 'South Indian', 'Gujarati', 'Home Style', 'Healthy'];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === 'All' || vendor.cuisineType === cuisineFilter;
    
    return matchesSearch && matchesCuisine;
  });

  return (
    <div>
      {/* Filter and Search Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {cuisineTypes.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine === 'All' ? 'All Cuisines' : cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Link href={`/vendor/${vendor._id}`} key={vendor._id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative h-48">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-bold">
                    ⭐ {vendor.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">{vendor.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{vendor.deliveryTime}</span>
                    <span>Min: ₹{vendor.minOrder}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            No vendors match your search criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
