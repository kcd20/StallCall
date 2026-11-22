import type { PaymentFailed, PaymentSucceeded } from '@stallcall/shared';

export type PaymentProviderName = 'mock' | 'stripe';

export interface CreatePaymentInput {
  orderId: string;
  amountCents: number;
  currency: 'SGD';
}

export interface CreatePaymentResult {
  paymentId: string;
  status: 'pending' | 'succeeded' | 'failed';
  /** Provider-specific token the client uses to complete payment (e.g. Stripe client secret). */
  clientSecret?: string;
}

export interface WebhookRequest {
  rawBody: string;
  headers: Record<string, string | string[] | undefined>;
}

export type PaymentResultEvent = PaymentSucceeded | PaymentFailed;

export interface PaymentProvider {
  readonly name: PaymentProviderName;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  /** Verifies and translates a provider webhook into a domain event, or null if irrelevant. */
  handleWebhook(req: WebhookRequest): Promise<PaymentResultEvent | null>;
}
