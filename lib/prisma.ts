// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

// تابع ساخت Prisma Client
function createPrismaClient() {
  const url = process.env.DATABASE_TURSO_DATABASE_URL;
  const authToken = process.env.DATABASE_TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('DATABASE_TURSO_DATABASE_URL is not defined');
  }

  // ساخت کلاینت LibSQL با تنظیمات درست
  const libsql = createClient({
    url: url,
    authToken: authToken,
  });

  // ساخت adapter
  const adapter = new PrismaLibSql(libsql);

  // برگرداندن PrismaClient با adapter
  return new PrismaClient({
    adapter,
  });
}

// Singleton pattern
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// تابع تست اتصال
export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// اکسپورت کردن PrismaClient برای استفاده در جای دیگه
export { PrismaClient };