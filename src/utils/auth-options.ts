import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/prisma/client';

const authOptions : AuthOptions = {
    
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
            params: {
                prompt: 'consent',
                access_type: 'offline',
                response_type: 'code',
            }
        }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ profile }) {
            if (!profile || !profile.email || !profile.name) {
                // if no profile, return false to deny sign in
                return false;
            }
            const client = prisma;
            // connect to the DB
            // check if user exists
            const user = await client.user.findUnique({
                where: {
                    email: profile.email
                }
            });
            // if not, create user
            if (!user) {
                await client.user.create({
                    data: {
                        email: profile.email,
                        name: profile.name,
                        image: profile.image,
                        password: '',
                        id: profile.sub // password is not used for Google sign in
                    }
                });
            }
            // return true if user is allowed to sign in
            return true;
            
        },
        async session({ session, token }) {
            // get user from DB
            // assign userID from session
            // return the session

            const allowedEmails = [
                "dwaynethomson14@gmail.com",
                "alexei1safronov@gmail.com",
                "keith@rallyadvisors.com"
            ]

            if (!allowedEmails.includes(session.user?.email || '')) {
                throw new Error("You are not allowed to access this application");
            }

            const client = prisma;
            // connect to the DB
            // check if user exists
            const user = await client.user.findUnique({
                where: {
                    id: token.sub
                }
            });
            // if not user, raise error
            if (!user) {
                throw new Error("User not found");
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                },
                expires: session.expires
            };
        }
    }
}

export {authOptions};