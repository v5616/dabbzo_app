'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccess() {
  const router = useRouter();
  
  useEffect(() => {
    // If user refreshes this page, redirect to home
    const handleBeforeUnload = () => {
      router.push('/');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);
  
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We have received your payment and your delicious tiffin will be delivered soon.
        </p>
        
        <div className="space-y-3">
          <Link href="/history" className="btn-primary block">
            View Order History
          </Link>
          
          <Link href="/" className="btn-secondary block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}