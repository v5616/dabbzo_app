import Link from "next/link";
import React from "react";

type Vendor = {
  id: number;
  name: string;
  image: string;
  rating: number;
  location: string;
  description: string;
};

// Remove the HomeProps type and props parameter
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

export default async function Home() {
  // Fetch data directly in the component
  const vendors = await getVendors();

  return (
    <main className="container-custom py-8">
      <section className="hero-section">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Delicious Homemade Meals
            <span className="block mt-2">Delivered Daily</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Enjoy fresh, healthy tiffin services from the best home chefs in
            your area. No more cooking hassles, just pure homemade goodness!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link
              href="/about"
              className="bg-white text-red-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Popular Tiffin Vendors</h2>
          <Link
            href="/vendors"
            className="text-red-500 hover:text-red-600 font-medium flex items-center"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors?.map((vendor: any) => (
            <div key={vendor.id} className="card group">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="vendor-card-image"
                />
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="rating-badge">{vendor.rating}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                  {vendor.name}
                </h3>
                <p className="text-gray-600 mb-3">{vendor.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  {vendor.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="my-16 bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your favorite homemade meals delivered in just a few simple
            steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
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
            <h3 className="text-xl font-bold mb-2">Choose a Vendor</h3>
            <p className="text-gray-600">
              Browse through our curated list of home chefs and tiffin services
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500"
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
            </div>
            <h3 className="text-xl font-bold mb-2">Place Your Order</h3>
            <p className="text-gray-600">
              Select your meals and checkout with our easy payment options
            </p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Enjoy Your Meal</h3>
            <p className="text-gray-600">
              Receive your fresh tiffin delivery right at your doorstep
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
