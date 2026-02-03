import { useState, useEffect } from 'react';

export type SubscriptionTier = 'free' | 'monthly' | 'yearly';

interface SubscriptionStatus {
  isActive: boolean;
  tier: SubscriptionTier;
  expiresAt: Date | null;
  daysRemaining: number;
}

export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isActive: false,
    tier: 'free',
    expiresAt: null,
    daysRemaining: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Default to free tier in visual-only mode
    setStatus({
      isActive: false,
      tier: 'free',
      expiresAt: null,
      daysRemaining: 0,
    });
  }, []);

  return {
    ...status,
    isLoading,
    isPremium: status.isActive,
  };
}
