import { useState, useEffect } from 'react';

// Mock token balance hook
export function useTokenBalance() {
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In visual-only mode, we always show 0 or could show a mock balance if we wanted to simulate being connected
    // But since the button says "Connect Wallet", we show 0
    setBalance('0');
  }, []);

  return {
    balance,
    isLoading,
    symbol: 'MANGA',
    formatted: `${balance} MANGA`,
  };
}

// Hook for pending rewards
export function usePendingRewards() {
  const [rewards, setRewards] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRewards(0);
  }, []);

  return {
    rewards,
    isLoading,
    formatted: `${rewards} MANGA`,
  };
}
