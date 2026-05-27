type PrismaLike = unknown;

declare global {
  // eslint-disable-next-line no-var
  var __retargetosPrisma: PrismaLike | undefined;
}

export async function getPrisma() {
  if (global.__retargetosPrisma) {
    return global.__retargetosPrisma;
  }

  const [{ PrismaPg }, { PrismaClient }, { Pool }] = await Promise.all([
    import("@prisma/adapter-pg"),
    import("@prisma/client"),
    import("pg"),
  ]);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });

  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    global.__retargetosPrisma = client;
  }

  return client;
}
