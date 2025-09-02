"use client";

import Image from "next/image";
import React from "react";
import { useCartStore, MenuItem } from "@/store/cartStore";

// Type definition for a single vendor
type Vendor = {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  menu: MenuItem[];
};

// Props for the client component
interface VendorPageContentProps {
  vendor: Vendor;
}

export default function VendorPageContent({ vendor }: VendorPageContentProps) {
  const { addItem, items } = useCartStore();

  const handleAddToCart = (item: MenuItem) => {
    if (vendor) {
      addItem(vendor._id, vendor.name, item);
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Vendor Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-[400px]">
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{vendor.name}</h1>
          <p className="text-gray-600 mb-4">{vendor.description}</p>
          <p className="mb-2">⭐ {vendor.rating} / 5</p>
          <p className="text-gray-600 mb-6">{vendor.address}</p>
        </div>
      </div>

      {/* Menu Section */}
      <h2 className="text-2xl font-semibold mt-12 mb-6">Menu</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {vendor.menu.map((item, indx) => (
          <div key={indx} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="font-bold mb-4">₹{item.price}</p>
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>
                  {item.name} - ₹{item.price}
                </span>
                <span className="text-gray-500">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
