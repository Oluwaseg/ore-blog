import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { hashPassword } from '../src/features/auth/password';

const connectionString = process.env.DATABASE_URL;
const email = process.env.ADMIN_EMAIL?.toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

if (!email || !password) {
  throw new Error(
    'ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the admin account'
  );
}

const adminEmail = email;
const adminPassword = password;

if (adminPassword.length < 8) {
  throw new Error('ADMIN_PASSWORD must be at least 8 characters');
}

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const existing = await db.admin.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log(`Admin already exists for ${adminEmail}. Skipping seed.`);
    return;
  }

  await db.admin.create({
    data: {
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
    },
  });

  console.log(`Created admin account for ${adminEmail}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
