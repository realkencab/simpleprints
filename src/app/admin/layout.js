import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { getPrinters } from "@/data-service";
import NavMenu from "./nav-menu";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const printersFromFile = await getPrinters();

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      
      {/* NAVBAR SIDE WINDOW
        Responsive design
        Desktop - Side bar
        Mobile - top bar
      */}
      <NavMenu printers={printersFromFile} role={session?.user?.role}/>

      {/* MAIN WINDOW 
          (loads children, wuhich is being returned by different pages) 
      */}
      <main className="bg-main-canvas flex-1 pt-32 md:pt-8 md:ml-64 relative flex flex-col items-center justify-center min-h-screen p-6 md:p-8">
        {children}          
      </main>
      
    </div>

  );
}