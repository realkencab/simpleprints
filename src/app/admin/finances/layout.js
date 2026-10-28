import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function FinancesLayout({ children }) {
  const session = await getServerSession(authOptions);

  const userRole = session?.user?.role?.toLowerCase();    // remove case sensitivity

  // Check if logged in use is an admin.
  // If not, redirect to portal landing page (/admin)
  if (userRole !== 'admin') {
    redirect('/admin');
  }

  return <>{children}</>;
}