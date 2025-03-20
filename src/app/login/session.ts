// TODO: Remove this file, it's not needed.
// use next-auth callback instead

import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { JWTPayload, SignJWT, jwtVerify} from 'jose';

const secretKey = 'secret-key'; // TODO: Replace with an actual secret key
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
   try {
    const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] });
    return payload;
   } catch  {
    return null;
   }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    (await cookies()).set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    redirect('/');
}

export async function verifySession() {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { isAuth: true, userId: String(session.userId) };
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);
  
    if (!session || !payload) {
      return null;
    }
  
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    (await cookies()).set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    });
  }
  
  export async function deleteSession() {
    (await cookies()).delete('session');
    redirect('/login');
  }