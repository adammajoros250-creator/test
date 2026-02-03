import { motion } from 'framer-motion';
import { Vote, Plus, Clock, Users, Check, X, ChevronDown, Coins, Shield, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useGovernance } from '@/hooks/useGovernance';
import { useMockAccount } from '@/hooks/useMockAccount';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const tabs = ['Active', 'Passed', 'Rejected', 'All'];

const Governance = () => {
  const { isConnected } = useMockAccount();
  const { proposals, votingPower, vote, isLoading } = useGovernance();
  const [activeTab, setActiveTab] = useState('Active');

  const filteredProposals = proposals.filter((p) => {
    if (activeTab === 'All') return true;
    return p.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-background noise">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl gradient-primary">
              <Vote className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="gradient-text">DAO</span> Governance
            </h1>
          </div>
          <p className="text-muted-foreground">Shape the future of MangaVerse</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Voting Power Banner */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl gradient-hero">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Voting Power</p>
                    <p className="text-2xl font-bold gradient-text">{votingPower.toLocaleString()} MANGA</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold gradient-primary text-primary-foreground"
                >
                  <Plus className="w-4 h-4" />
                  Create Proposal
                </motion.button>
              </motion.div>
            )}

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'gradient-primary text-primary-foreground'
                      : 'glass-hover'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Proposals */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                    <div className="h-6 w-48 bg-muted rounded mb-3" />
                    <div className="h-4 w-full bg-muted rounded mb-2" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProposals.map((proposal, index) => {
                  const percentFor = Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst || 1)) * 100);
                  const percentAgainst = 100 - percentFor;
                  const quorumPercent = Math.min(100, Math.round((proposal.totalVotes / proposal.quorum) * 100));

                  return (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-2xl p-6 hover-lift"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              proposal.status === 'active' ? 'bg-accent/20 text-accent' :
                              proposal.status === 'passed' ? 'bg-success/20 text-success' :
                              'bg-destructive/20 text-destructive'
                            }`}>
                              {proposal.status}
                            </span>
                            {proposal.hasVoted && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                                You voted {proposal.userVote}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-xl mb-2">{proposal.title}</h3>
                          <p className="text-muted-foreground">{proposal.description}</p>
                        </div>
                      </div>

                      {/* Vote Bars */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="flex items-center gap-2 text-success">
                              <Check className="w-4 h-4" />
                              For
                            </span>
                            <span className="font-medium">{percentFor}% ({proposal.votesFor.toLocaleString()})</span>
                          </div>
                          <div className="h-3 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentFor}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-success"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="flex items-center gap-2 text-destructive">
                              <X className="w-4 h-4" />
                              Against
                            </span>
                            <span className="font-medium">{percentAgainst}% ({proposal.votesAgainst.toLocaleString()})</span>
                          </div>
                          <div className="h-3 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentAgainst}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-destructive"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Quorum: {quorumPercent}%
                            {proposal.totalVotes >= proposal.quorum && (
                              <Check className="w-4 h-4 text-success" />
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {proposal.status === 'active'
                              ? `Ends ${formatDistanceToNow(proposal.endsAt, { addSuffix: true })}`
                              : `Ended ${formatDistanceToNow(proposal.endsAt, { addSuffix: true })}`
                            }
                          </span>
                        </div>

                        {proposal.status === 'active' && !proposal.hasVoted && isConnected && (
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => vote(proposal.id, true)}
                              className="px-5 py-2 rounded-xl text-sm font-semibold bg-success/20 text-success hover:bg-success/30 transition-colors"
                            >
                              Vote For
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => vote(proposal.id, false)}
                              className="px-5 py-2 rounded-xl text-sm font-semibold bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                            >
                              Vote Against
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Governance Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-muted-foreground">Total Proposals</span>
                  <span className="font-bold">47</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-muted-foreground">Passed</span>
                  <span className="font-bold text-success">38</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-muted-foreground">Total Votes Cast</span>
                  <span className="font-bold">2.5M MANGA</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-muted-foreground">Unique Voters</span>
                  <span className="font-bold">8,234</span>
                </div>
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">How Governance Works</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Hold MANGA Tokens</p>
                    <p className="text-muted-foreground">Your voting power equals your token balance</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Create or Vote</p>
                    <p className="text-muted-foreground">Need 10K MANGA to create proposals</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Reach Quorum</p>
                    <p className="text-muted-foreground">100K MANGA votes needed to pass</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Anti-whale Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 border border-warning/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-warning" />
                <h3 className="font-semibold">Anti-Whale Protection</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Maximum voting power is capped at 5% of total supply per user to ensure fair governance.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Governance;
