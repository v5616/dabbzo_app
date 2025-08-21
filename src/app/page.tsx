import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Mock data for vendors
  const vendors = [
    {
      id: "1",
      name: "Homely Tiffin",
      description: "Authentic home-cooked meals with love",
      rating: 4.8,
      address: "123 Main St, City",
      image: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Spice Box",
      description: "Flavorful and spicy tiffin options",
      rating: 4.5,
      address: "456 Oak St, City",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Health First",
      description: "Nutritious and balanced meals",
      rating: 4.7,
      address: "789 Pine St, City",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "Quick Bites",
      description: "Fast and delicious tiffin service",
      rating: 4.3,
      address: "101 Elm St, City",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "5",
      name: "Grandma's Kitchen",
      description: "Traditional recipes with modern twist",
      rating: 4.9,
      address: "202 Maple St, City",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "6",
      name: "Office Lunch Box",
      description: "Perfect for busy professionals",
      rating: 4.6,
      address: "303 Cedar St, City",
      image: "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?q=80&w=1000&auto=format&fit=crop"
    },
  ];

  return (
    <main className="container-custom py-8">
      <section className="hero-section">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Delicious Homemade Meals
            <span className="block mt-2">Delivered Daily</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Enjoy fresh, healthy tiffin services from the best home chefs in your area.
            No more cooking hassles, just pure homemade goodness!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link href="/about" className="bg-white text-red-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Popular Tiffin Vendors</h2>
          <Link href="/vendors" className="text-red-500 hover:text-red-600 font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendor/${vendor.id}`}
              className="card group"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="vendor-card-image"
                />
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="rating-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {vendor.rating}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">{vendor.name}</h3>
                <p className="text-gray-600 mb-3">{vendor.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vendor.address}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-16 bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Get your favorite homemade meals delivered in just a few simple steps</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Choose a Vendor</h3>
            <p className="text-gray-600">Browse through our curated list of home chefs and tiffin services</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Place Your Order</h3>
            <p className="text-gray-600">Select your meals and checkout with our easy payment options</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Enjoy Your Meal</h3>
            <p className="text-gray-600">Receive your fresh tiffin delivery right at your doorstep</p>
          </div>
        </div>
      </section>
    </main>
  );
}
