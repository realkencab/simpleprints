'use client';

import { signOut } from 'next-auth/react';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'; // Specific logout icon

export default function LogoutButton() {
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-brand-hover hover:text-white transition-colors text-sm font-medium text-left"
    >
      <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-3 hidden md:block" />
      <span>Logout</span>
    </button>
  );
}