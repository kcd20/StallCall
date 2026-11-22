import { z } from 'zod';
import { buildApp } from './app.js';
import { getPaymentProvider } from './providers/index.js';

const env = z
  .object({
    PORT: z.coerce.number().int().positive().default(4003),
    HOST: z.string().default('0.0.0.0'),
  })
  .parse(process.env);

const provider = getPaymentProvider();
const app = buildApp({ logger: true });

try {
  await app.listen({ port: env.PORT, host: env.HOST });
  app.log.info({ provider: provider.name }, 'payment provider selected');
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
