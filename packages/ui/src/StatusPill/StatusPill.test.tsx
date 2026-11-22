import { ORDER_STATUSES } from '@stallcall/shared';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusPill } from './StatusPill.tsx';

describe('StatusPill', () => {
  it.each([
    ['PENDING_PAYMENT', 'Awaiting payment'],
    ['RECEIVED', 'Received'],
    ['PREPARING', 'Preparing'],
    ['READY', 'Ready'],
    ['COLLECTED', 'Collected'],
    ['CANCELLED', 'Cancelled'],
  ] as const)('shows %s as "%s"', (status, label) => {
    render(<StatusPill status={status} />);

    expect(screen.getByText(label)).toHaveAttribute('data-status', status);
  });

  it('has a label for every OrderStatus', () => {
    for (const status of ORDER_STATUSES) {
      const { container, unmount } = render(<StatusPill status={status} />);
      expect(container.textContent).not.toBe('');
      unmount();
    }
  });

  it('hides the decorative dot from screen readers', () => {
    const { container } = render(<StatusPill status="READY" />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
