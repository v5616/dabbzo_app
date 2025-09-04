// src/components/VendorsList/FiltersSection.tsx
"use client";

import React from "react";

interface InputFieldProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cuisineFilter: string;
  setCuisineFilter: (filter: string) => void;
  cuisineTypes: string[];
}

export default function InputField({
  searchTerm,
  setSearchTerm,
  cuisineFilter,
  setCuisineFilter,
  cuisineTypes,
}: InputFieldProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      {/* Search Input */}
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

      {/* Cuisine Dropdown */}
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
  );
}
