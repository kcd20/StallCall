import { randomUUID } from 'node:crypto';
import type {
  CreatePaymentResult,
  PaymentProvider,
  PaymentResultEvent,
} from './PaymentProvider.js';

/** Stub provider for local dev and tests. No real money moves. */
export class MockPaymentProvider implements PaymentProvider {
  readonly name = 'mock' as const;

  async createPayment(): Promise<CreatePaymentResult> {
    return { paymentId: `mock_${randomUUID()}`, status: 'pending' };
  }

  async handleWebhook(): Promise<PaymentResultEvent | null> {
    return null;
  }
}
