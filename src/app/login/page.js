import { redirect } from 'next/navigation'; 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginForm from './LoginPage';

export const metadata = {
    title: 'Login'
};

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/admin');
    }

    return (
        <main className="login-page-container">
            <LoginForm />
        </main>
    );
}
