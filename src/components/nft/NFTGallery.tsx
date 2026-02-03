import { motion } from 'framer-motion';
import { Image, Lock, ExternalLink, Sparkles } from 'lucide-react';
import { useNFTs, NFT } from '@/hooks/useNFTs';

const rarityColors = {
  common: 'bg-muted text-muted-foreground',
  rare: 'bg-cyan/20 text-cyan',
  epic: 'bg-violet/20 text-violet',
  legendary: 'bg-gold/20 text-gold',
};

const rarityGlow = {
  common: '',
  rare: 'shadow-cyan/20',
  epic: 'shadow-violet/20',
  legendary: 'shadow-gold/20 animate-glow-pulse',
};

function NFTCard({ nft, index }: { nft: NFT; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative group glass rounded-xl overflow-hidden cursor-pointer transition-shadow duration-300 shadow-lg ${rarityGlow[nft.rarity]}`}
    >
      {/* Image container */}
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 rounded-full gradient-primary opacity-30">
            <Image className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rarityColors[nft.rarity]}`}>
            {nft.rarity}
          </span>
          {nft.isSoulbound && (
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Soulbound
            </span>
          )}
        </div>

        {/* View button on hover */}
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold truncate">{nft.name}</h4>
        <p className="text-sm text-muted-foreground truncate">{nft.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground capitalize badge-nft">
            {nft.type}
          </span>
          <span className="text-xs text-muted-foreground">
            {nft.acquiredAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function NFTGallery() {
  const { nfts, badges, collectibles, themes, isLoading, totalCount } = useNFTs();

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-muted shimmer" />
          ))}
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <div className="p-4 rounded-full gradient-accent w-fit mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No NFTs Yet</h3>
        <p className="text-muted-foreground mb-4">
          Connect your wallet and start earning badges and collectibles!
        </p>
      </motion.div>
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
          <div className="p-3 rounded-xl gradient-accent">
            <Image className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">NFT Collection</h3>
            <p className="text-sm text-muted-foreground">{totalCount} items owned</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/20 text-primary">
            All
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Badges ({badges.length})
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Collectibles ({collectibles.length})
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {nfts.map((nft, index) => (
          <NFTCard key={nft.id} nft={nft} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
