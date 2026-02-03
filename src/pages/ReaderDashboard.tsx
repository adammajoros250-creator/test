import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Wallet, 
  Coins, 
  TrendingUp, 
  Clock, 
  BookMarked,
  ChevronRight,
  Settings,
  Bell,
  BarChart3
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useMockAccount } from '@/hooks/useMockAccount';
import logo from '@/assets/mangaverse-logo.png';
import { 
  DotsLoader, 
  SpinnerLoader, 
  ChartSkeleton, 
  DataCardSkeleton,
  SkeletonLoader,
  PanelLoader
} from '@/components/ui/loading-indicators';

const ReaderDashboard = () => {
  const { isConnected } = useMockAccount();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab: string) => {
    if (tab !== activeTab) {
      setIsLoading(true);
      setActiveTab(tab);
      // Loading persists indefinitely - only stops when explicitly triggered
    }
  };

  return (
    <div className="min-h-screen bg-background noise">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.a
              href="/"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="MangaVerse" className="h-8 w-auto" />
              <span className="font-display font-bold text-xl">MangaVerse</span>
            </motion.a>
            
            <nav className="hidden md:flex items-center gap-1">
              {['Dashboard', 'Library', 'Rewards', 'NFTs'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleTabClick(item)}
                  whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item 
                      ? 'text-foreground bg-muted' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg glass-hover relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg glass-hover"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <WalletButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Full Content Loading State */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[70vh]"
          >
            <div className="w-full max-w-4xl rounded-2xl bg-[#1a1f2e] p-16 flex items-center justify-center">
              <DotsLoader />
            </div>
            <p className="mt-6 text-muted-foreground text-sm">Loading {activeTab}...</p>
          </motion.div>
        ) : (
          <>
            {/* Top Stats Bar - Loading */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: BookMarked, label: 'Chapters Read' },
                { icon: Clock, label: 'Reading Time' },
                { icon: Coins, label: 'MANGA Earned' },
                { icon: TrendingUp, label: '24h Change' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <SkeletonLoader className="h-7 w-20" />
                    <SpinnerLoader size="sm" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area - Chart with Loading */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reading Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Reading Activity</h2>
                  <p className="text-sm text-muted-foreground">Your reading stats over time</p>
                </div>
                <div className="flex items-center gap-2">
                  {['1D', '1W', '1M', 'ALL'].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium glass-hover"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <ChartSkeleton />
            </motion.div>

            {/* Current Chapter Info - Loading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Continue Reading</h2>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1 text-sm text-primary"
                >
                  View Library <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/30">
                    <SkeletonLoader className="w-20 h-28 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-3">
                      <SkeletonLoader className="h-5 w-3/4" />
                      <SkeletonLoader variant="line" className="w-1/2" />
                      <div className="flex items-center gap-2">
                        <SkeletonLoader className="h-2 flex-1 rounded-full" />
                        <SpinnerLoader size="sm" />
                      </div>
                      <SkeletonLoader variant="line" className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Chapters Table - Loading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Chapter History</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Loading chapters</span>
                  <DotsLoader />
                </div>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                    <SkeletonLoader variant="circle" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLoader className="h-4 w-48" />
                      <SkeletonLoader variant="line" className="w-24" />
                    </div>
                    <SkeletonLoader className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Wallet Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl gradient-primary">
                  <Wallet className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Wallet Status</h3>
                  <p className="text-sm text-muted-foreground">
                    {isConnected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>

              {isConnected ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30">
                    <span className="text-sm text-muted-foreground block mb-2">Balance</span>
                    <div className="flex items-center gap-2">
                      <SkeletonLoader className="h-8 w-32" />
                      <SpinnerLoader size="sm" />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <span className="text-sm text-muted-foreground block mb-2">Network</span>
                    <div className="flex items-center gap-2">
                      <SkeletonLoader className="h-5 w-20" />
                      <DotsLoader />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your wallet to view your MANGA balance
                  </p>
                  <WalletButton />
                </div>
              )}
            </motion.div>

            {/* MANGA Token Rewards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl gradient-gold">
                  <Coins className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">MANGA Rewards</h3>
                  <p className="text-sm text-muted-foreground">Earnings & bonuses</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <span className="text-sm">Pending Rewards</span>
                  <div className="flex items-center gap-2">
                    <SkeletonLoader className="h-5 w-16" />
                    <SpinnerLoader size="sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <span className="text-sm">Daily Streak Bonus</span>
                  <div className="flex items-center gap-2">
                    <SkeletonLoader className="h-5 w-12" />
                    <DotsLoader />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <span className="text-sm">Total Earned</span>
                  <SkeletonLoader className="h-5 w-20" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  disabled
                  className="w-full py-3 rounded-xl font-semibold gradient-primary text-primary-foreground opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Claim Rewards</span>
                  <SpinnerLoader size="sm" />
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Actions - Loading */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold">Quick Stats</h3>
              </div>
              <PanelLoader />
            </motion.div>

            {/* Achievements Loading */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Achievements</h3>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-muted/30 flex items-center justify-center">
                    <SkeletonLoader variant="circle" className="w-10 h-10" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <SkeletonLoader variant="line" className="w-full" />
              </div>
            </motion.div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReaderDashboard;
