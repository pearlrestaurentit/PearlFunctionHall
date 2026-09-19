import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Secure admin authentication using environment variables
        const validUsername = process.env.ADMIN_USERNAME || "admin";
        const validPassword = process.env.ADMIN_PASSWORD || "admin123";
        
        if (credentials?.username === validUsername && credentials?.password === validPassword) {
          return { id: "1", name: "Admin", email: "admin@thepearlhall.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
