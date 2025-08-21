export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Dabbzo</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At Dabbzo, we connect food lovers with local home chefs who prepare authentic, homemade tiffin meals. Our mission is to provide convenient access to healthy, home-cooked food while supporting local culinary talent.
        </p>
        <p className="text-gray-700">
          We believe that everyone deserves access to nutritious, homemade meals even when they're too busy to cook. That's why we've built a platform that makes ordering tiffin services as easy as a few clicks.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <span className="text-red-500 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Browse Local Vendors</h3>
              <p className="text-gray-600">Explore our curated list of home chefs and tiffin services in your area.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <span className="text-red-500 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">Choose Your Meals</h3>
              <p className="text-gray-600">Select from a variety of menu options that suit your taste and dietary preferences.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <span className="text-red-500 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-medium">Place Your Order</h3>
              <p className="text-gray-600">Complete your purchase securely through our platform.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <span className="text-red-500 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-medium">Enjoy Fresh Food</h3>
              <p className="text-gray-600">Receive your freshly prepared meals delivered right to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <div className="space-y-2">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>support@dabbzo.com</span>
          </p>
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+91 98765 43210</span>
          </p>
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>123 Food Street, Foodville, India</span>
          </p>
        </div>
      </div>
    </div>
  );
}