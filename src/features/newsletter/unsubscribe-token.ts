import { SignJWT, jwtVerify } from 'jose';
import { createHash } from 'node:crypto';

function getSigningKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }

  return createHash('sha256').update(secret).digest();
}

export async function createUnsubscribeToken(subscriberId: string) {
  return new SignJWT({ purpose: 'newsletter-unsubscribe' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(subscriberId)
    .setIssuedAt()
    .sign(getSigningKey());
}

export async function verifyUnsubscribeToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSigningKey(), {
      algorithms: ['HS256'],
    });

    if (
      payload.purpose !== 'newsletter-unsubscribe' ||
      typeof payload.sub !== 'string'
    ) {
      return null;
    }

    return payload.sub;
  } catch {
    return null;
  }
}
