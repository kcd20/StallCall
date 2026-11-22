export const ORDER_STATUSES = [
  'PENDING_PAYMENT',
  'RECEIVED',
  'PREPARING',
  'READY',
  'COLLECTED',
  'CANCELLED',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
