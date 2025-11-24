'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentPlan } from '@/hooks/use-payment';
import type { ReactNode } from 'react';

interface PremiumContentProps {
  children: ReactNode;
}

/**
 * Client-side Premium Content component
 * Note: This component now serves as a fallback for client-side rendering.
 * The main security filtering happens server-side in PremiumGuard component.
 */
export function PremiumContent({ children }: PremiumContentProps) {
  const currentUser = useCurrentUser();
  const { data: paymentData } = useCurrentPlan(currentUser?.id);

  // Determine if user has premium access
  const hasPremiumAccess =
    paymentData?.currentPlan &&
    (paymentData.currentPlan.isLifetime || !paymentData.currentPlan.isFree);

  // Only show content if user has premium access
  // This is a client-side fallback - main security is handled server-side
  if (!currentUser || !hasPremiumAccess) {
    return null;
  }

  return <div className="premium-content-section">{children}</div>;
}
