import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: "Coming Soon!"
}

export default function Page() {
  return (
    <>
      {/* 1. This is your existing content up to line 11 */}
      <div className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-brand-text text-center">
          Simple Crafts: Pr1nts & Mak3s<br />
          Coming Soon....
        </h1>
      </div>

      {/* 2. Your fixed bottom link wrapper now works fine */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Link 
          href="/admin" 
          className="bg-brand-primary text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-brand-hover transition-all duration-200 block text-center"
        >
          Log In
        </Link>
      </div>
    </>
  );
}
