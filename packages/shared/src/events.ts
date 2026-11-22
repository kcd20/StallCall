import { z } from 'zod';
import { ORDER_STATUSES } from './order.js';

const OrderStatusSchema = z.enum(ORDER_STATUSES);

const BaseEventSchema = z.object({
  eventId: z.uuid(),
  occurredAt: z.iso.datetime(),
  orderId: z.string().min(1),
});

export const OrderStatusChangedSchema = BaseEventSchema.extend({
  type: z.literal('OrderStatusChanged'),
  stallId: z.string().min(1),
  previousStatus: OrderStatusSchema.nullable(),
  newStatus: OrderStatusSchema,
});
export type OrderStatusChanged = z.infer<typeof OrderStatusChangedSchema>;

export const PaymentSucceededSchema = BaseEventSchema.extend({
  type: z.literal('PaymentSucceeded'),
  paymentId: z.string().min(1),
  amountCents: z.number().int().positive(),
  currency: z.literal('SGD'),
});
export type PaymentSucceeded = z.infer<typeof PaymentSucceededSchema>;

export const PaymentFailedSchema = BaseEventSchema.extend({
  type: z.literal('PaymentFailed'),
  paymentId: z.string().min(1),
  reason: z.string().min(1),
});
export type PaymentFailed = z.infer<typeof PaymentFailedSchema>;

export const StallCallEventSchema = z.discriminatedUnion('type', [
  OrderStatusChangedSchema,
  PaymentSucceededSchema,
  PaymentFailedSchema,
]);
export type StallCallEvent = z.infer<typeof StallCallEventSchema>;
