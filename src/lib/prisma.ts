import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Configura um Pool de conexão da biblioteca pg usando o URL correto
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Passa o pool para o adaptador PrismaPg
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 3. Inicializa o cliente Prisma usando o adaptador configurado
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}