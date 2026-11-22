import { z } from 'zod';
import { buildApp } from './app.js';

const env = z
  .object({
    PORT: z.coerce.number().int().positive().default(4002),
    HOST: z.string().default('0.0.0.0'),
  })
  .parse(process.env);

const app = buildApp({ logger: true });

try {
  await app.listen({ port: env.PORT, host: env.HOST });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
