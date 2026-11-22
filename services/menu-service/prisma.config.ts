import { fileURLToPath } from 'node:url';
import { defineConfig } from 'prisma/config';

// Load the repo-root .env (if present) so the Prisma CLI sees DATABASE_URL.
try {
  process.loadEnvFile(fileURLToPath(new URL('../../.env', import.meta.url)));
} catch {
  // No .env file: rely on variables already set in the environment (e.g. CI).
}

const url = process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'tsx prisma/seed.ts' },
  // `prisma generate` needs no database, so a missing URL is fine (e.g. in CI).
  // migrate, seed and studio will report the missing URL themselves.
  datasource: url ? { url } : {},
});
