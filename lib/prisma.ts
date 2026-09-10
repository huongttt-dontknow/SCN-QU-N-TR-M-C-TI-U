import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/sconnect_kpi?schema=public";
let url = databaseUrl;

if (url && !url.includes("pgbouncer=true")) {
  url += url.includes("?") ? "&pgbouncer=true" : "?pgbouncer=true";
}

if (url && !url.includes("statement_cache_size=")) {
  url += url.includes("?") ? "&statement_cache_size=0" : "?statement_cache_size=0";
}

if (url && !url.includes("connection_limit=")) {
  url += url.includes("?") ? "&connection_limit=10&pool_timeout=10" : "?connection_limit=10&pool_timeout=10";
}

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: url
    }
  }
});

// Always set global.prisma so serverless warm instances reuse the connection pool
global.prisma = prisma;
