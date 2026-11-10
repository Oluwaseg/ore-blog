import { hash, verify } from "@node-rs/argon2";

const hashOptions = {
  algorithm: 2,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
};

let dummyHashPromise: Promise<string> | undefined;

function getDummyHash() {
  dummyHashPromise ??= hash("timing-protection-dummy", hashOptions);
  return dummyHashPromise;
}

export function hashPassword(password: string) {
  return hash(password, hashOptions);
}

export async function verifyPassword(passwordHash: string, password: string) {
  return verify(passwordHash, password);
}

export async function verifyPasswordOrDummy(
  passwordHash: string | undefined,
  password: string,
) {
  const hashToCheck = passwordHash ?? (await getDummyHash());
  const isValid = await verify(hashToCheck, password);
  return Boolean(passwordHash) && isValid;
}
