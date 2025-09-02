import { useState, useEffect } from "react";
import Link from "next/link";

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

async function getVendors() {
  // Use relative URL or absolute URL with proper origin
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/vendors`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }

  const data = await res.json();
  return data.vendors || [];
}

export default async function VendorsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("All");

  // useEffect(() => {
  //   const fetchVendors = async () => {
  //     try {
  //       // In a real app, this would fetch from the API
  //       // For now, we'll use mock data
  //       const mockVendors = [
  //         {
  //           _id: '1',
  //           name: 'Homely Tiffins',
  //           description: 'Authentic home-cooked meals delivered fresh daily',
  //           image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1000&auto=format&fit=crop',
  //           rating: 4.5,
  //           address: '123 Food Street, Foodville',
  //           cuisineType: 'North Indian',
  //           deliveryTime: '30-40 min',
  //           minOrder: 100
  //         },
  //         {
  //           _id: '2',
  //           name: 'Spice Garden',
  //           description: 'Flavorful South Indian tiffin with authentic taste',
  //           image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop',
  //           rating: 4.3,
  //           address: '456 Spice Avenue, Flavortown',
  //           cuisineType: 'South Indian',
  //           deliveryTime: '25-35 min',
  //           minOrder: 120
  //         },
  //         {
  //           _id: '3',
  //           name: 'Mom\'s Kitchen',
  //           description: 'Just like mom used to make - homestyle comfort food',
  //           image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop',
  //           rating: 4.7,
  //           address: '789 Comfort Lane, Homeville',
  //           cuisineType: 'Home Style',
  //           deliveryTime: '35-45 min',
  //           minOrder: 150
  //         },
  //         {
  //           _id: '4',
  //           name: 'Healthy Bites',
  //           description: 'Nutritious and delicious meals for the health-conscious',
  //           image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
  //           rating: 4.2,
  //           address: '101 Wellness Road, Fitnessville',
  //           cuisineType: 'Healthy',
  //           deliveryTime: '30-40 min',
  //           minOrder: 180
  //         },
  //         {
  //           _id: '5',
  //           name: 'Punjabi Dhaba',
  //           description: 'Authentic Punjabi flavors in every bite',
  //           image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop',
  //           rating: 4.6,
  //           address: '202 Punjab Street, Flavortown',
  //           cuisineType: 'North Indian',
  //           deliveryTime: '25-35 min',
  //           minOrder: 130
  //         },
  //         {
  //           _id: '6',
  //           name: 'Gujarati Rasoi',
  //           description: 'Traditional Gujarati thali and snacks',
  //           image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop',
  //           rating: 4.4,
  //           address: '303 Gujarat Avenue, Tasteville',
  //           cuisineType: 'Gujarati',
  //           deliveryTime: '30-40 min',
  //           minOrder: 120
  //         }
  //       ];

  //       setVendors(mockVendors);
  //     } catch (err) {
  //       console.error('Failed to load vendors', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVendors();
  // }, []);
  const vendors = await getVendors();
  const cuisineTypes = [
    "All",
    "North Indian",
    "South Indian",
    "Gujarati",
    "Home Style",
    "Healthy",
  ];

  // const filteredVendors = vendors.filter(vendor => {
  //   const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCuisine = cuisineFilter === 'All' || vendor.cuisineType === cuisineFilter;

  //   return matchesSearch && matchesCuisine;
  // });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Tiffin Vendors
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the best tiffin services in your area and enjoy delicious
          home-cooked meals
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="md:w-64">
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {cuisineTypes.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine === "All" ? "All Cuisines" : cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vendors Grid */}
      {/* {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Link href={`/vendor/${vendor._id}`} key={vendor._id} className="block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="relative h-48">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {vendor.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{vendor.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {vendor.cuisineType}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      Min ₹{vendor.minOrder}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {vendor.deliveryTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{vendor.address}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">No vendors found</h3>
          <p className="text-gray-600">
            No vendors match your search criteria. Try adjusting your filters.
          </p>
        </div>
      )} */}
    </div>
  );
}
