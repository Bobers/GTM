'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

export default function InvitePage() {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // In production, this would validate against a backend
  const VALID_CODES = ['EARLY2025', 'FOUNDER100', 'GTMPILOT'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (VALID_CODES.includes(accessCode.toUpperCase())) {
      // Store access in localStorage and cookie
      localStorage.setItem('gtm-access-granted', 'true');
      localStorage.setItem('gtm-access-code', accessCode.toUpperCase());
      document.cookie = 'gtm-access-granted=true; path=/; max-age=2592000'; // 30 days
      router.push('/');
    } else {
      setError('Invalid access code. Please check your invitation email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GTM Navigator</h1>
          <p className="text-gray-600">Early Access Program</p>
        </div>

        {/* Access Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold">Enter Access Code</h2>
          </div>

          <p className="text-gray-600 mb-6">
            GTM Navigator is currently in private beta. Enter your invitation code to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError('');
                }}
                placeholder="Enter your access code"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:outline-none transition-colors
                  text-center text-lg font-mono uppercase"
                maxLength={10}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg 
                hover:bg-blue-700 transition-colors font-semibold
                flex items-center justify-center gap-2 group"
            >
              Access GTM Navigator
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Don&apos;t have an access code?{' '}
              <a 
                href="https://tally.so/r/REQUEST_ACCESS_FORM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Request early access
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By accessing GTM Navigator, you agree to provide feedback
            <br />
            to help us improve the product.
          </p>
        </div>
      </div>
    </div>
  );
}