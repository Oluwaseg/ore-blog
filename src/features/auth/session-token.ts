import { createHash } from "node:crypto";
import { EncryptJWT, jwtDecrypt } from "jose";
import { getEnv } from "@/lib/env";
import { SESSION_MAX_AGE_SECONDS } from "./constants";

export type AdminSession = {
  adminId: string;
  email: string;
};

function getSecretKey() {
  const { AUTH_SECRET } = getEnv();
  return createHash("sha256").update(AUTH_SECRET).digest();
}

export async function encryptSession(session: AdminSession) {
  return new EncryptJWT(session)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .setSubject(session.adminId)
    .encrypt(getSecretKey());
}

export async function decryptSession(
  token: string,
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtDecrypt(token, getSecretKey());

    if (
      typeof payload.adminId !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return { adminId: payload.adminId, email: payload.email };
  } catch {
    return null;
  }
}
