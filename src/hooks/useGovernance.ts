import { useState, useEffect } from 'react';

export type ProposalStatus = 'active' | 'passed' | 'rejected' | 'pending';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  endsAt: Date;
  createdAt: Date;
  hasVoted: boolean;
  userVote?: 'for' | 'against';
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    title: 'Increase Daily Reward Cap',
    description: 'Proposal to increase the daily reward cap from 100 to 150 MANGA tokens to encourage more community engagement.',
    proposer: '0x1234...5678',
    status: 'active',
    votesFor: 125000,
    votesAgainst: 45000,
    totalVotes: 170000,
    quorum: 100000,
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    hasVoted: false,
  },
  {
    id: '2',
    title: 'New NFT Collection: Seasonal Themes',
    description: 'Launch a new seasonal NFT collection with exclusive themes for premium members.',
    proposer: '0xabcd...ef01',
    status: 'active',
    votesFor: 89000,
    votesAgainst: 12000,
    totalVotes: 101000,
    quorum: 100000,
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    hasVoted: true,
    userVote: 'for',
  },
  {
    id: '3',
    title: 'Partnership with Top Manga Publishers',
    description: 'Allocate 50,000 MANGA from treasury for partnership deals with major manga publishers.',
    proposer: '0x9876...5432',
    status: 'passed',
    votesFor: 450000,
    votesAgainst: 50000,
    totalVotes: 500000,
    quorum: 100000,
    endsAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    hasVoted: true,
    userVote: 'for',
  },
];

export function useGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [votingPower, setVotingPower] = useState(0);

  useEffect(() => {
    // Show mock proposals even if not "connected" to look ready, or keep empty if we want to be strict
    // Let's show empty as button says "Connect Wallet"
    setProposals([]);
    setVotingPower(0);
  }, []);

  const activeProposals = proposals.filter((p) => p.status === 'active');
  const passedProposals = proposals.filter((p) => p.status === 'passed');

  const vote = async (proposalId: string, support: boolean) => {
    // Mock voting
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId
          ? {
              ...p,
              hasVoted: true,
              userVote: support ? 'for' : 'against',
              votesFor: support ? p.votesFor + votingPower : p.votesFor,
              votesAgainst: !support ? p.votesAgainst + votingPower : p.votesAgainst,
              totalVotes: p.totalVotes + votingPower,
            }
          : p
      )
    );
    return true;
  };

  return {
    proposals,
    activeProposals,
    passedProposals,
    votingPower,
    isLoading,
    vote,
  };
}
