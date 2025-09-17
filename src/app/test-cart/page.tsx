"use client";

import { useCartStore, type MenuItem } from "@/store/cartStore";
import { useAuth } from "@/providers/AuthProvider";

export default function TestCartPage() {
  const { addItem, items, clearCart } = useCartStore();
  const { user } = useAuth();

  const testVendor = {
    id: "test-vendor-1",
    name: "Test Vendor"
  };

  const testItems = [
    {
      _id: "meal-1",
      name: "Pizza",
      description: "Delicious pizza",
      price: 250,
      image: "/test.jpg"
    },
    {
      _id: "meal-2", 
      name: "Burger",
      description: "Tasty burger",
      price: 150,
      image: "/test.jpg"
    },
    {
      _id: "meal-3",
      name: "Pasta",
      description: "Creamy pasta", 
      price: 200,
      image: "/test.jpg"
    }
  ];

  interface TestMenuItem extends Omit<MenuItem, 'id'> {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }

  const handleAddItem = async (item: TestMenuItem) => {
    console.log("Adding item:", item);
    // Convert _id to id to match the MenuItem interface
    const menuItem: MenuItem = {
      id: Number(item._id.replace('meal-', '')), // Convert 'meal-1' to 1
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image
    };
    await addItem(testVendor.id, testVendor.name, menuItem, user?.id);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Cart Test Page</h1>
      
      {user ? (
        <p className="mb-4">Logged in as: {user.email}</p>
      ) : (
        <p className="mb-4 text-red-500">Not logged in</p>
      )}

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {testItems.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold">₹{item.price}</p>
            <button
              onClick={() => handleAddItem(item)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <button
          onClick={() => clearCart(user?.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cart Contents ({items.length} items)</h2>
        {items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span>{item.name} (ID: {item.id})</span>
                <span>Qty: {item.quantity} | ₹{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
