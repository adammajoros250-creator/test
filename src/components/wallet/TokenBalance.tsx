import { motion } from 'framer-motion';
import { Coins, TrendingUp, Gift } from 'lucide-react';
import { useTokenBalance, usePendingRewards } from '@/hooks/useTokenBalance';

export function TokenBalance() {
  const { balance, isLoading: balanceLoading } = useTokenBalance();
  const { rewards, isLoading: rewardsLoading } = usePendingRewards();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 hover-lift"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl gradient-primary">
          <Coins className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Token Balance</h3>
          <p className="text-sm text-muted-foreground">Your MANGA holdings</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Main Balance */}
        <div className="p-4 rounded-xl bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Available</span>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          {balanceLoading ? (
            <div className="h-8 w-32 rounded bg-muted shimmer" />
          ) : (
            <p className="text-2xl font-bold gradient-text">{balance} MANGA</p>
          )}
        </div>

        {/* Pending Rewards */}
        <div className="p-4 rounded-xl bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pending Rewards</span>
            <Gift className="w-4 h-4 text-gold" />
          </div>
          {rewardsLoading ? (
            <div className="h-8 w-24 rounded bg-muted shimmer" />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold gradient-text-gold">{rewards} MANGA</p>
              {rewards > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold gradient-primary text-primary-foreground"
                >
                  Claim
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
