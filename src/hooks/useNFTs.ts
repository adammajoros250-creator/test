import { useState, useEffect } from 'react';

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'badge' | 'collectible' | 'theme';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isSoulbound: boolean;
  acquiredAt: Date;
}

export function useNFTs() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show empty NFTs in visual-only disconnected mode
    setNfts([]);
  }, []);

  const badges = nfts.filter((n) => n.type === 'badge');
  const collectibles = nfts.filter((n) => n.type === 'collectible');
  const themes = nfts.filter((n) => n.type === 'theme');

  return {
    nfts,
    badges,
    collectibles,
    themes,
    isLoading,
    totalCount: nfts.length,
  };
}
