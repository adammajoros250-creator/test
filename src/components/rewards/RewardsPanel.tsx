import { motion } from 'framer-motion';
import { Star, Gift, Zap, Clock, TrendingUp } from 'lucide-react';
import { REWARDS } from '@/config/web3';

interface RewardActivity {
  id: string;
  type: 'review' | 'rating' | 'daily' | 'referral' | 'list';
  amount: number;
  timestamp: Date;
  description: string;
}

const RECENT_ACTIVITIES: RewardActivity[] = [
  {
    id: '1',
    type: 'review',
    amount: 10,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: 'Reviewed "Chainsaw Man"',
  },
  {
    id: '2',
    type: 'daily',
    amount: 5,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    description: 'Daily login bonus',
  },
  {
    id: '3',
    type: 'rating',
    amount: 2,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    description: 'Rated "One Piece"',
  },
  {
    id: '4',
    type: 'list',
    amount: 15,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    description: 'Created "Best Shonen" list',
  },
];

const rewardTypeIcons = {
  review: Star,
  rating: Star,
  daily: Gift,
  referral: TrendingUp,
  list: Zap,
};

const rewardTypeColors = {
  review: 'text-gold',
  rating: 'text-electric-blue',
  daily: 'text-accent',
  referral: 'text-success',
  list: 'text-royal-purple',
};

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export function RewardsPanel() {
  const todayEarned = 27;
  const dailyLimit = REWARDS.dailyLimit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl gradient-hero">
          <Gift className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Daily Rewards</h3>
          <p className="text-sm text-muted-foreground">Earn MANGA tokens</p>
        </div>
      </div>

      {/* Today's progress */}
      <div className="p-4 rounded-xl bg-muted/50 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Today's earnings</span>
          <span className="text-sm font-medium">
            {todayEarned}/{dailyLimit} MANGA
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(todayEarned / dailyLimit) * 100}%` }}
            className="h-full rounded-full gradient-hero"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Resets in 16h 23m
        </p>
      </div>

      {/* Reward rates */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Review', amount: REWARDS.review, icon: Star },
          { label: 'Rating', amount: REWARDS.rating, icon: Star },
          { label: 'Daily Login', amount: REWARDS.dailyLogin, icon: Gift },
          { label: 'Create List', amount: REWARDS.createList, icon: Zap },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 p-3 rounded-lg bg-muted/30"
          >
            <item.icon className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-semibold">+{item.amount} MANGA</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {RECENT_ACTIVITIES.map((activity) => {
            const Icon = rewardTypeIcons[activity.type];
            const colorClass = rewardTypeColors[activity.type];
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${colorClass}`} />
                  <div>
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-success">
                  +{activity.amount}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
