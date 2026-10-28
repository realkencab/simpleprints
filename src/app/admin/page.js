import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export const metadata = {
  title: 'Admin', 
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8 bg-main-surface-primary rounded-lg shadow-sm w-full max-w-sm border border-gray-200 text-center mt-12 md:mt-0">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Login Successful! 🎉
      </h1>
      <p className="text-on-surface-primary mb-2">
        Welcome, <strong>{session?.user?.name}</strong>!
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Your role: <span className="font-semibold text-on-surface-emph">{session?.user?.role || 'Undefined'}</span>
      </p>
    </div>
  );
}