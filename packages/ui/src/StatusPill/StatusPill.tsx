import type { OrderStatus } from '@stallcall/shared';
import styles from './StatusPill.module.css';

type Tone = 'received' | 'preparing' | 'ready' | 'neutral' | 'cancelled';

// One entry per status. Typed as Record<OrderStatus, ...> so TypeScript
// fails the build if a new status is added to @stallcall/shared but not here.
const STATUS_DISPLAY: Record<OrderStatus, { label: string; tone: Tone }> = {
  PENDING_PAYMENT: { label: 'Awaiting payment', tone: 'neutral' },
  RECEIVED: { label: 'Received', tone: 'received' },
  PREPARING: { label: 'Preparing', tone: 'preparing' },
  READY: { label: 'Ready', tone: 'ready' },
  COLLECTED: { label: 'Collected', tone: 'neutral' },
  CANCELLED: { label: 'Cancelled', tone: 'cancelled' },
};

export interface StatusPillProps {
  status: OrderStatus;
}

export function StatusPill({ status }: StatusPillProps) {
  const { label, tone } = STATUS_DISPLAY[status];

  return (
    <span className={`${styles.pill} ${styles[tone]}`} data-status={status}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
