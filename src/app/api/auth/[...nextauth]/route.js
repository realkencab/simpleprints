import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserFromSheet } from "@/lib/data-service"; // Clean alias directly to src/data-service.js

// 1. Export authOptions explicitly so other pages can import it
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Checks against empty inputs
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const cleanUsername = credentials.username.trim().toLowerCase();
        const user = await getUserFromSheet(cleanUsername);

        // Checks if user does not exist
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (isPasswordValid) {
          return {
            id: user.username,
            name: user.username,
            role: user.role ? user.role.trim().toLowerCase() : '',
            requiresPasswordChange: user.requiresPasswordChange
          };
        }

        return null; 
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.requiresPasswordChange = user.requiresPasswordChange;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.requiresPasswordChange = token.requiresPasswordChange;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };