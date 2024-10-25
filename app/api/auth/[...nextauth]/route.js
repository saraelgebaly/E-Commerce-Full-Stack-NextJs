import { connectMongoDB } from "@/libs/Models/MongoContect";
import User from "@/libs/Models/Users";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrybt from "bcryptjs";
import { NextResponse } from "next/server";
const login = async (credentials) => {
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "The user not found",
        }),
        { status: 404 }
      );    }
    const isCorrect = await bcrybt.compare(credentials.password, user.password);
    console.log("pass", isCorrect);

    if (!isCorrect) {
      return new NextResponse(
        JSON.stringify({
          message: "Email or Password is not correct",
        }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Login successfully",
        user: user,
      }),{status: 200}
    );
  } catch (error) {
    console.log("Error while logging in", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to login",
        error: error.message,
      }),
      { status: error.status }
    );
  }
};

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          console.log("crendentials are ", credentials);
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("Failed to login", error);
          return null;
        }
      },
    }),
  ],
  callback: {
    async jwt({ token, user }) {
      if (user) {
        token.userName = user.username;
        token.email = user.email;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.userName = token.userName;
        session.user.email = token.email;
        session.user.id = token.id;
      }

      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
