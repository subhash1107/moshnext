import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/prisma/client';
import { NextAuthOptions } from "next-auth";
const authOption:NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    // secret: process.env.NEXTAUTH_SECRET!,
    session:{
        strategy:'jwt'
    }
}

export default authOption