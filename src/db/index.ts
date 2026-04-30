import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

declare global {
  var __playtubeAuthPool: unknown;
}

const env = process.env["NODE_ENV"] || "development";

export const pool =
  globalThis.__playtubeAuthPool ??
  new Pool({
    host: process.env["DB_HOST"] || "",
    port: parseInt(process.env["DB_PORT"] || "5432"),
    user: process.env["DB_USER"] || "",
    database: process.env["DB_NAME"] || "",
    password: process.env["DB_PASSWORD"] || "secret",
    ssl:
      env === "production"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

if (env !== "production") {
  globalThis.__playtubeAuthPool = pool;
}

export const db = drizzle(pool, { schema });

const accounts = await db.select().from(schema.authAccounts);

console.log({ accounts });

export * from "./schema";
