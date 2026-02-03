// Contract addresses (to be updated after deployment)
export const CONTRACTS = {
  // Polygon Mainnet
  mainnet: {
    mangaToken: '0x0000000000000000000000000000000000000000',
    nftCollection: '0x0000000000000000000000000000000000000000',
    premiumSubscription: '0x0000000000000000000000000000000000000000',
    governance: '0x0000000000000000000000000000000000000000',
    rewardDistributor: '0x0000000000000000000000000000000000000000',
  },
  // Polygon Amoy Testnet
  testnet: {
    mangaToken: '0x0000000000000000000000000000000000000000',
    nftCollection: '0x0000000000000000000000000000000000000000',
    premiumSubscription: '0x0000000000000000000000000000000000000000',
    governance: '0x0000000000000000000000000000000000000000',
    rewardDistributor: '0x0000000000000000000000000000000000000000',
  },
} as const;

// Token configuration
export const MANGA_TOKEN = {
  name: 'MANGA',
  symbol: 'MANGA',
  decimals: 18,
  icon: '📚',
} as const;

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  monthly: {
    name: 'Monthly Premium',
    price: 100, // MANGA tokens
    duration: 30, // days
    discount: 0,
  },
  yearly: {
    name: 'Yearly Premium',
    price: 1000, // MANGA tokens
    duration: 365, // days
    discount: 17, // percentage
  },
} as const;

// Reward configuration
export const REWARDS = {
  dailyLogin: 5,
  review: 10,
  rating: 2,
  createList: 15,
  referral: 50,
  dailyLimit: 100,
  cooldownHours: 24,
} as const;
