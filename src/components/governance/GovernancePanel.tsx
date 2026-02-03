import { motion } from 'framer-motion';
import { Vote, Clock, Check, X, Users, ChevronRight } from 'lucide-react';
import { useGovernance, Proposal } from '@/hooks/useGovernance';
import { formatDistanceToNow } from 'date-fns';

function ProposalCard({ proposal, votingPower, onVote }: { 
  proposal: Proposal; 
  votingPower: number;
  onVote: (id: string, support: boolean) => void;
}) {
  const percentFor = Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst || 1)) * 100);
  const percentAgainst = 100 - percentFor;
  const quorumReached = proposal.totalVotes >= proposal.quorum;
  const quorumPercent = Math.min(100, Math.round((proposal.totalVotes / proposal.quorum) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-5 hover-lift"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                proposal.status === 'active'
                  ? 'bg-accent/20 text-accent'
                  : proposal.status === 'passed'
                  ? 'bg-success/20 text-success'
                  : 'bg-destructive/20 text-destructive'
              }`}
            >
              {proposal.status}
            </span>
            {proposal.hasVoted && (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                Voted {proposal.userVote}
              </span>
            )}
          </div>
          <h4 className="font-semibold text-lg mb-1">{proposal.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{proposal.description}</p>
        </div>
      </div>

      {/* Vote bars */}
      <div className="space-y-3 mb-4">
        {/* For */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-success">
              <Check className="w-4 h-4" />
              For
            </span>
            <span>{percentFor}% ({proposal.votesFor.toLocaleString()})</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentFor}%` }}
              className="h-full rounded-full bg-success"
            />
          </div>
        </div>

        {/* Against */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-destructive">
              <X className="w-4 h-4" />
              Against
            </span>
            <span>{percentAgainst}% ({proposal.votesAgainst.toLocaleString()})</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentAgainst}%` }}
              className="h-full rounded-full bg-destructive"
            />
          </div>
        </div>
      </div>

      {/* Quorum */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Users className="w-4 h-4" />
        <span>Quorum: {quorumPercent}%</span>
        {quorumReached && <Check className="w-4 h-4 text-success" />}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {proposal.status === 'active' 
              ? `Ends ${formatDistanceToNow(proposal.endsAt, { addSuffix: true })}`
              : `Ended ${formatDistanceToNow(proposal.endsAt, { addSuffix: true })}`
            }
          </span>
        </div>

        {proposal.status === 'active' && !proposal.hasVoted && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVote(proposal.id, true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-success/20 text-success hover:bg-success/30 transition-colors"
            >
              Vote For
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVote(proposal.id, false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
            >
              Vote Against
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function GovernancePanel() {
  const { proposals, activeProposals, votingPower, isLoading, vote } = useGovernance();

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-muted shimmer" />
          <div>
            <div className="h-5 w-32 bg-muted rounded shimmer mb-2" />
            <div className="h-4 w-24 bg-muted rounded shimmer" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-muted shimmer" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl gradient-primary">
            <Vote className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Governance</h3>
            <p className="text-sm text-muted-foreground">
              {activeProposals.length} active proposals
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Your Voting Power</p>
          <p className="font-bold gradient-text">{votingPower.toLocaleString()} MANGA</p>
        </div>
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
            onVote={vote}
          />
        ))}
      </div>

      {/* View All Link */}
      <motion.button
        whileHover={{ x: 5 }}
        className="flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        View all proposals
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
