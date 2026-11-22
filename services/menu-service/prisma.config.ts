import { fileURLToPath } from 'node:url';
import { defineConfig, env } from 'prisma/config';

// Load the repo-root .env (if present) so the Prisma CLI sees DATABASE_URL.
try {
  process.loadEnvFile(fileURLToPath(new URL('../../.env', import.meta.url)));
} catch {
  // No .env file: rely on variables already set in the environment (e.g. CI).
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'tsx prisma/seed.ts' },
  datasource: { url: env('DATABASE_URL') },
});
