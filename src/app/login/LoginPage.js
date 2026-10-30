'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { cn } from '@/utils/clsx';

export const metadata = {
  title: 'Login', 
}

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Grab values directly from the HTML form elements on submit
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') || '';
    const password = formData.get('password') || '';

    const cleanUsername = username.toString().trim().toLowerCase();

    const result = await signIn('credentials', {
      redirect: false,
      username: cleanUsername,
      password,
    });

    if (result?.error) {
      setError('Invalid username or password');
      setIsLoading(false);
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div className="min-h-screen bg-main-canvas flex items-center justify-center">
      <form onSubmit={handleLogin} 
        method="POST" 
        className={cn(
          "bg-main-card-primary",
          "border border-lines-subtle",
          "p-8 rounded-lg shadow-sm w-96 space-y-4"
        )}
      >
        <h1 className="text-3xl font-bold text-on-main-panel-emph text-center">Simple Crafts <br />
          <span className="text-sm font-bold text-on-panel-emph">Pr1nts & Mak3s</span>
        </h1>
        
        
        {error && <p className="text-on-terracotta-primary text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username" // Required for FormData to target the field
            autoComplete="username"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-lines-secondary rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-terracotta-border disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password" // Required for FormData to target the field
            autoComplete="current-password"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-lines-secondary rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-terracotta-border disabled:opacity-50"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-brand-primary text-on-brand-primary py-2 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-primary-hover'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Logging In...</span>
            </>
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
}