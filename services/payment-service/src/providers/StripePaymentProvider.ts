import type {
  CreatePaymentResult,
  PaymentProvider,
  PaymentResultEvent,
} from './PaymentProvider.js';

/** Placeholder until Stripe test-mode integration lands. */
export class StripePaymentProvider implements PaymentProvider {
  readonly name = 'stripe' as const;

  async createPayment(): Promise<CreatePaymentResult> {
    throw new Error('StripePaymentProvider.createPayment not implemented');
  }

  async handleWebhook(): Promise<PaymentResultEvent | null> {
    throw new Error('StripePaymentProvider.handleWebhook not implemented');
  }
}
