import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // Existing Credentials-based login
    Credentials({
      name: "Credentials",
      id: "loginWithPassword",
      credentials: {
        email: { label: "email", type: "email", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("inside authorize (login) credentials", credentials);
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email, type: credentials.type },
        });

        // Validate user and password
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        // Return user details (session will store this)
        return {
          userId: user.userId,
          email: user.email,
          role: user.role,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  // JWT and session logic
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour session duration in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      let userId = user?.userId || token?.userId;
      // Use the user ID from the session to fetch full user data
      const fullUser = await prisma.user.findUnique({
        where: { userId },
      });

      if (fullUser) {
        token.userId = fullUser.userId;
        token.email = fullUser.email; // Store email in the session
        token.firstName = fullUser.firstName; // Store first name in the session
        token.lastName = fullUser.lastName; // Store last name in the session
        token.type = fullUser.type; // Store type in the session
        token.phoneNumber = fullUser.phoneNumber; // Store phone number in the session
      }

      return token; // Return updated session
    },

    async session({ session, token }) {
      console.log("In session", session);
      // Populate session with token data
      session.user.userId = token.userId;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.type = token.type;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.phoneNumber = token.phoneNumber;
      return session;
    },
  },
  // pages: {
  //   signIn: "//${locale}/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
