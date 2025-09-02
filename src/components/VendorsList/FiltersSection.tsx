import Link from "next/link";
import React from "react";

type Props = {
  filteredVendors: any[];
};

const FiltersSection = ({ filteredVendors }: Props) => {
  return (
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {vendor.rating}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {vendor.description}
              </p>

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="truncate">{vendor.address}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FiltersSection;
