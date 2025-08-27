"use client";

import React, { useState, useEffect, use } from "react";
import { useCartStore } from "@/store/cartStore";

type MenuItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

type Vendor = {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  menu: MenuItem[];
};

export default function VendorDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Use params directly instead of unwrapping with React.use
  const { id } = use(params);

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addItem, items } = useCartStore();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        // Mock API data (replace with fetch(`/api/vendors/${id}`) later)
        const mockVendor: Vendor = {
          _id: id,
          name: id === "1" ? "Homely Tiffins" : "Sample Vendor",
          description: "Authentic home-cooked meals delivered fresh daily",
          image:
            "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1000&auto=format&fit=crop",
          rating: 4.5,
          address: "123 Food Street, Foodville",
          menu: [
            {
              _id: "1",
              name: "Veg Thali",
              price: 120,
              description: "Rice, Dal, 2 Sabzi, Roti, Salad",
            },
            {
              _id: "2",
              name: "Paneer Butter Masala",
              price: 180,
              description: "Paneer cooked in rich tomato gravy",
            },
            {
              _id: "3",
              name: "Rajma Chawal",
              price: 100,
              description: "Classic Punjabi style Rajma with rice",
            },
          ],
        };

        setVendor(mockVendor);
      } catch (err) {
        setError("Failed to load vendor details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]); // ✅ no hydration warning

  const handleAddToCart = (item: any) => {
    if (vendor) {
      addItem(vendor._id, vendor.name, item); // ✅ correct now
    }
  };

  if (loading) return <div className="p-8 text-center">Loading vendor...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;
  if (!vendor) return <div className="p-8 text-center">Vendor not found</div>;

  return (
    <div className="container-custom py-8">
      {/* Vendor Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={vendor.image}
            alt={vendor.name}
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
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
        {vendor.menu.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-sm">
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
