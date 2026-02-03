import { motion } from 'framer-motion';
import { Sparkles, Crown, Clock, Check } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { SUBSCRIPTION_TIERS } from '@/config/web3';

export function SubscriptionCard() {
  const { isPremium, tier, daysRemaining, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded mb-4" />
        <div className="h-20 w-full bg-muted rounded" />
      </div>
    );
  }

  if (isPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl gradient-card p-6 glow-gold"
      >
        {/* Premium Badge */}
        <div className="absolute top-4 right-4">
          <span className="badge-premium flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-gold to-electric-blue">
            <Sparkles className="w-6 h-6 text-background" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Premium Active</h3>
            <p className="text-sm text-muted-foreground capitalize">{tier} Plan</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{daysRemaining} days remaining</span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(daysRemaining / 30) * 100}%` }}
            className="h-full rounded-full bg-gradient-to-r from-gold to-electric-blue"
          />
        </div>

        {/* Benefits */}
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-muted-foreground mb-3">Your Benefits</p>
          {['Ad-free experience', 'Exclusive themes', '2x reward multiplier', 'Early access to features'].map(
            (benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span>{benefit}</span>
              </div>
            )
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl gradient-accent">
          <Sparkles className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Go Premium</h3>
          <p className="text-sm text-muted-foreground">Unlock exclusive features</p>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Monthly Plan */}
        <div className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{SUBSCRIPTION_TIERS.monthly.name}</span>
            <span className="text-lg font-bold">{SUBSCRIPTION_TIERS.monthly.price} MANGA</span>
          </div>
          <p className="text-sm text-muted-foreground">Billed monthly</p>
        </div>

        {/* Yearly Plan */}
        <div className="relative p-4 rounded-xl gradient-border bg-muted/50 cursor-pointer">
          <div className="absolute -top-2 -right-2">
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-success text-success-foreground">
              Save {SUBSCRIPTION_TIERS.yearly.discount}%
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{SUBSCRIPTION_TIERS.yearly.name}</span>
            <span className="text-lg font-bold">{SUBSCRIPTION_TIERS.yearly.price} MANGA</span>
          </div>
          <p className="text-sm text-muted-foreground">Billed yearly</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 py-3 rounded-xl font-semibold gradient-primary text-primary-foreground glow-primary"
      >
        Subscribe Now
      </motion.button>
    </motion.div>
  );
}
