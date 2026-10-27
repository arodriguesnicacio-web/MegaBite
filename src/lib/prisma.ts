import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

let prismaInstance: PrismaClient;

if (connectionString) {
  const adapter = new PrismaPg({ connectionString });
  prismaInstance = new PrismaClient({ adapter });
} else {
  // Mock gracioso para evitar crash durante builds offline/sem banco configurado
  prismaInstance = new Proxy({} as PrismaClient, {
    get() {
      return () => Promise.resolve(null);
    },
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
} 