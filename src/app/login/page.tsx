'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Redirect to home page on successful login
      router.push('/');
      router.refresh();
    } catch (err: Error | unknown) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // In a real app, this would call an API to send OTP
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOtpSent(true);
      // Mock OTP for demo purposes
      console.log('OTP sent: 123456');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would verify the OTP with an API
      // For now, we'll simulate it with a timeout and mock verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') { // Mock verification
        // Redirect to home page on successful login
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Invalid OTP. Please try again.');
      }
    } catch (err: Error | unknown) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Login</h1>
      
      {/* Login Method Tabs */}
      <div className="flex mb-6 border-b">
        <button 
          className={`flex-1 py-2 text-center font-medium ${loginMethod === 'password' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setLoginMethod('password')}
        >
          Password Login
        </button>
        <button 
          className={`flex-1 py-2 text-center font-medium ${loginMethod === 'otp' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => {
            setLoginMethod('otp');
            setOtpSent(false);
            setOtp('');
          }}
        >
          OTP Login
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loginMethod === 'password' ? (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label htmlFor="phoneNumberOtp" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phoneNumberOtp"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpLogin}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <div className="text-sm text-gray-500 mb-2">
                  OTP sent to {phoneNumber}
                  <button 
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="ml-2 text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
              
              <div className="mt-3 text-center">
                <button 
                  type="button"
                  onClick={handleSendOtp}
                  className="text-primary hover:underline text-sm"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}