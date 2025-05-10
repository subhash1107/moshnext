import authOption from '@/app/auth/authOption'
import NextAuth from 'next-auth'


const handler = NextAuth(authOption)

export {handler as GET, handler as POST}