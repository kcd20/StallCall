import { z } from 'zod';
import { MockPaymentProvider } from './MockPaymentProvider.js';
import type { PaymentProvider } from './PaymentProvider.js';
import { StripePaymentProvider } from './StripePaymentProvider.js';

export type * from './PaymentProvider.js';

const ProviderNameSchema = z.enum(['mock', 'stripe']).default('mock');

export function getPaymentProvider(
  name: string | undefined = process.env.PAYMENT_PROVIDER,
): PaymentProvider {
  switch (ProviderNameSchema.parse(name)) {
    case 'mock':
      return new MockPaymentProvider();
    case 'stripe':
      return new StripePaymentProvider();
  }
}
