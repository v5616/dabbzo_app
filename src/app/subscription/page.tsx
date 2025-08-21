'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubscriptionPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the email to your API
    // For now, just show the success message
    setSubmitted(true);
  };

  const subscriptionPlans = [
    {
      name: 'Weekly Plan',
      price: '₹599',
      period: 'per week',
      features: [
        '7 days of meals',
        'Choose from 3 vendors',
        'Free delivery',
        'Customize meals daily'
      ],
      popular: false,
      comingSoon: true
    },
    {
      name: 'Monthly Plan',
      price: '₹1999',
      period: 'per month',
      features: [
        '30 days of meals',
        'Choose from all vendors',
        'Free delivery',
        'Customize meals daily',
        'Priority support',
        '10% discount on extra orders'
      ],
      popular: true,
      comingSoon: true
    },
    {
      name: 'Quarterly Plan',
      price: '₹5499',
      period: 'per quarter',
      features: [
        '90 days of meals',
        'Choose from all vendors',
        'Free delivery',
        'Customize meals daily',
        'Priority support',
        '15% discount on extra orders',
        'Special festival meals'
      ],
      popular: false,
      comingSoon: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dabbzo Subscription Plans
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Subscribe to regular tiffin deliveries and save money while enjoying delicious, home-cooked meals every day.
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-8 mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscription Service Coming Soon!</h2>
        <p className="text-xl mb-6">
          We&apos;re working hard to bring you convenient subscription plans for regular tiffin deliveries.
          Be the first to know when we launch!
        </p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
              />
              <button 
                type="submit"
                className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Notify Me
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-white font-medium">
              Thank you! We&apos;ll notify you when subscriptions are available.
            </p>
          </div>
        )}
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {subscriptionPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${
              plan.popular ? 'ring-2 ring-primary transform md:scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium">
                Most Popular
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500"> {plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button 
                disabled={plan.comingSoon}
                className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">How will the subscription work?</h3>
            <p className="text-gray-700">
              Our subscription service will allow you to pre-pay for daily tiffin deliveries. 
              You&apos;ll be able to choose your preferred vendors, customize your meals daily, 
              and enjoy significant savings compared to ordering individually.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I pause my subscription?</h3>
            <p className="text-gray-700">
              Yes, you&apos;ll be able to pause your subscription for up to 7 days at a time. 
              This is perfect for when you&apos;re traveling or have other dining plans.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I customize my meals?</h3>
            <p className="text-gray-700">
              Subscribers will receive a notification each evening to select their meals for the next day. 
              If you don&apos;t make a selection, we&apos;ll deliver the vendor&apos;s special of the day.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">When will subscriptions be available?</h3>
            <p className="text-gray-700">
              We&apos;re working hard to launch our subscription service within the next few months. 
              Sign up above to be notified as soon as it&apos;s available!
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="btn-secondary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}