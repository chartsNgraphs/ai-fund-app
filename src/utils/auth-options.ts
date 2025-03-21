import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

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
    callbacks: {
        async signIn({ profile }) {
            // connect to the DB
            // check if user exists
            // if not, create user
            // return true if user is allowed to sign in
            return true;
        },
        async session({ session, token }) {
            // get user from DB
            // assign userID from session
            // return the session
            return {
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