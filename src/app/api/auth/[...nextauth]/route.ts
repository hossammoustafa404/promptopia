import connectDB from "@lib/api/connectDB";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/userModel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }: any) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      console.log(user._id);
      session.user.id = user._id.toString();

      console.log(session);

      return session;
    },
    async signIn({
      user,
    }: {
      user: {
        id: string;
        name: string;
        email: string;
        image: string;
      };
    }) {
      try {
        await connectDB();
        const searchedUser = await User.findOne({ email: user.email });

        if (!searchedUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          return true;
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
