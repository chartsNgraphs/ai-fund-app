
export {default} from 'next-auth/middleware';

export const config = {
    matcher: [ "/feed/:path*", "/prospects/:path*"],
    pages: {
        signIn: '/login',
    }
}