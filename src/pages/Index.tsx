import { motion } from 'framer-motion';
import { Wallet, Sparkles, Vote, Image, ArrowRight, BookOpen, Users, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { TokenBalance } from '@/components/wallet/TokenBalance';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';
import { NFTGallery } from '@/components/nft/NFTGallery';
import { GovernancePanel } from '@/components/governance/GovernancePanel';
import { TrendingManga } from '@/components/manga/TrendingManga';
import { RewardsPanel } from '@/components/rewards/RewardsPanel';
import { useMockAccount } from '@/hooks/useMockAccount';
import heroImage from '@/assets/hero-image.jpg';

const features = [
  { icon: Wallet, title: 'Web3 Wallet', description: 'Connect MetaMask, WalletConnect & more' },
  { icon: Coins, title: 'Earn Tokens', description: 'Get MANGA for reviews, ratings & activity' },
  { icon: Image, title: 'NFT Badges', description: 'Collect soulbound badges & themes' },
  { icon: Vote, title: 'DAO Governance', description: 'Vote on proposals with your tokens' },
];

const Index = () => {
  const { isConnected } = useMockAccount();

  return (
    <div className="min-h-screen bg-background noise">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="container mx-auto px-4 pt-12 pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-nft mb-4 inline-block">Web3 Manga Network</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Read, Collect & <span className="gradient-text text-glow">Earn</span> with Manga
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Join the ultimate manga community. Earn MANGA tokens, collect NFT badges, and shape the future through DAO governance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/reader-dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold gradient-primary text-primary-foreground glow-primary"
                  >
                    <BookOpen className="w-5 h-5" />
                    Start Reading
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass-hover"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 gradient-hero opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="MangaVerse Hero"
                className="relative rounded-2xl shadow-2xl glow-primary"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5 hover-lift text-center"
            >
              <div className="p-3 rounded-xl gradient-primary w-fit mx-auto mb-3">
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Manga */}
      <section className="container mx-auto px-4 py-8">
        <TrendingManga />
      </section>

      {/* Dashboard Grid */}
      {isConnected && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-display font-bold mb-6 gradient-text">Your Dashboard</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <TokenBalance />
              <SubscriptionCard />
            </div>
            <div>
              <RewardsPanel />
            </div>
            <div>
              <GovernancePanel />
            </div>
          </div>
        </section>
      )}

      {/* NFT Gallery */}
      {isConnected && (
        <section className="container mx-auto px-4 py-8 pb-20">
          <NFTGallery />
        </section>
      )}
    </div>
  );
};

export default Index;
