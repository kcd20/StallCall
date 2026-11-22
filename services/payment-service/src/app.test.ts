import { afterAll, describe, expect, it } from 'vitest';
import { buildApp } from './app.js';
import { getPaymentProvider } from './providers/index.js';

describe('GET /health', () => {
  const app = buildApp();
  afterAll(() => app.close());

  it('returns ok with the service name', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'ok', service: 'payment-service' });
  });
});

describe('getPaymentProvider', () => {
  it('defaults to mock', () => {
    expect(getPaymentProvider(undefined).name).toBe('mock');
  });

  it('selects stripe, which is not implemented yet', async () => {
    const stripe = getPaymentProvider('stripe');
    expect(stripe.name).toBe('stripe');
    await expect(
      stripe.createPayment({ orderId: 'o1', amountCents: 500, currency: 'SGD' }),
    ).rejects.toThrow('not implemented');
  });

  it('rejects unknown providers', () => {
    expect(() => getPaymentProvider('paypal')).toThrow();
  });
});
