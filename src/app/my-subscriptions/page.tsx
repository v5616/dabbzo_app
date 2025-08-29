'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MySubscriptionsPage() {
  // In a real app, this would fetch from the API based on the logged-in user
  // For now, we'll use mock data showing no active subscriptions
  const [_activeSubscriptions, _setActiveSubscriptions] = useState([]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Subscriptions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Manage your tiffin delivery subscriptions and meal preferences.
        </p>
      </div>

      {/* No Subscriptions State */}
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">No Active Subscriptions</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You don&apos;t have any active subscriptions yet. Subscribe to your favorite vendors for regular tiffin deliveries.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-2">Coming Soon!</h3>
          <p className="text-gray-600 mb-4">
            Our subscription service is launching soon. Subscribe to your favorite vendors and enjoy:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Regular tiffin deliveries without ordering daily</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Significant savings compared to individual orders</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Customize your meals daily with flexible options</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Priority delivery and special offers</span>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn-primary inline-block">
          Explore Vendors
        </Link>
      </div>
      
      {/* Future UI Elements (commented out for now) */}
      {/* 
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Subscription History</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 text-center py-8">No subscription history found.</p>
        </div>
      </div>
      */}
    </div>
  );
}