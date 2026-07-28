import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL;
let url = databaseUrl;
if (url && !url.includes("pgbouncer=true")) {
  if (url.includes("?")) {
    url += "&pgbouncer=true";
  } else {
    url += "?pgbouncer=true";
  }
}
if (url && !url.includes("statement_cache_size=")) {
  if (url.includes("?")) {
    url += "&statement_cache_size=0";
  } else {
    url += "?statement_cache_size=0";
  }
}

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: url
    }
  }
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
