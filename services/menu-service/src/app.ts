import Fastify, { type FastifyServerOptions } from 'fastify';

export const SERVICE_NAME = 'menu-service';

export function buildApp(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);

  app.get('/health', async () => ({ status: 'ok', service: SERVICE_NAME }));

  return app;
}
