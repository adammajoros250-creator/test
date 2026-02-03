import { motion } from 'framer-motion';
import { TrendingUp, Flame, Star, Heart, ArrowUp, ArrowDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import manga cover images
import chainsawManCover from '@/assets/manga/chainsaw-man.jpg';
import onePieceCover from '@/assets/manga/one-piece.jpg';
import jujutsuKaisenCover from '@/assets/manga/jujutsu-kaisen.jpg';
import spyXFamilyCover from '@/assets/manga/spy-x-family.jpg';
import dandadanCover from '@/assets/manga/dandadan.jpg';
import blueLockCover from '@/assets/manga/blue-lock.jpg';
import frierenCover from '@/assets/manga/frieren.jpg';
import vinlandSagaCover from '@/assets/manga/vinland-saga.jpg';
import kingdomCover from '@/assets/manga/kingdom.jpg';
import kaijuNo8Cover from '@/assets/manga/kaiju-no-8.jpg';
import berserkCover from '@/assets/manga/berserk.jpg';
import monsterCover from '@/assets/manga/monster.jpg';
import vagabondCover from '@/assets/manga/vagabond.jpg';
import deathNoteCover from '@/assets/manga/death-note.jpg';
import fullmetalAlchemistCover from '@/assets/manga/fullmetal-alchemist.jpg';
import attackOnTitanCover from '@/assets/manga/attack-on-titan.jpg';

const timeRanges = ['Today', 'This Week', 'This Month', 'All Time'];

const TRENDING_DATA = [
  { id: '1', rank: 1, prevRank: 2, title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', rating: 4.9, views: 1250000, likes: 45200, trending: '+15%', cover: chainsawManCover },
  { id: '2', rank: 2, prevRank: 1, title: 'One Piece', author: 'Eiichiro Oda', rating: 4.95, views: 2100000, likes: 125000, trending: '+8%', cover: onePieceCover },
  { id: '3', rank: 3, prevRank: 5, title: 'Jujutsu Kaisen', author: 'Gege Akutami', rating: 4.85, views: 980000, likes: 78500, trending: '+22%', cover: jujutsuKaisenCover },
  { id: '4', rank: 4, prevRank: 3, title: 'Spy x Family', author: 'Tatsuya Endo', rating: 4.8, views: 750000, likes: 56000, trending: '+5%', cover: spyXFamilyCover },
  { id: '5', rank: 5, prevRank: 8, title: 'Dandadan', author: 'Yukinobu Tatsu', rating: 4.7, views: 620000, likes: 38000, trending: '+35%', cover: dandadanCover },
  { id: '6', rank: 6, prevRank: 4, title: 'Blue Lock', author: 'Muneyuki Kaneshiro', rating: 4.75, views: 580000, likes: 42000, trending: '+3%', cover: blueLockCover },
  { id: '7', rank: 7, prevRank: 10, title: 'Frieren', author: 'Kanehito Yamada', rating: 4.9, views: 520000, likes: 48000, trending: '+28%', cover: frierenCover },
  { id: '8', rank: 8, prevRank: 6, title: 'Vinland Saga', author: 'Makoto Yukimura', rating: 4.85, views: 450000, likes: 35000, trending: '+2%', cover: vinlandSagaCover },
  { id: '9', rank: 9, prevRank: 9, title: 'Kingdom', author: 'Yasuhisa Hara', rating: 4.85, views: 420000, likes: 32000, trending: '+7%', cover: kingdomCover },
  { id: '10', rank: 10, prevRank: 12, title: 'Kaiju No. 8', author: 'Naoya Matsumoto', rating: 4.7, views: 380000, likes: 28000, trending: '+18%', cover: kaijuNo8Cover },
  { id: '11', rank: 11, prevRank: 14, title: 'Berserk', author: 'Kentaro Miura', rating: 4.95, views: 350000, likes: 52000, trending: '+25%', cover: berserkCover },
  { id: '12', rank: 12, prevRank: 11, title: 'Monster', author: 'Naoki Urasawa', rating: 4.9, views: 320000, likes: 38000, trending: '+12%', cover: monsterCover },
  { id: '13', rank: 13, prevRank: 15, title: 'Vagabond', author: 'Takehiko Inoue', rating: 4.9, views: 290000, likes: 35000, trending: '+20%', cover: vagabondCover },
  { id: '14', rank: 14, prevRank: 13, title: 'Death Note', author: 'Tsugumi Ohba', rating: 4.85, views: 275000, likes: 41000, trending: '+6%', cover: deathNoteCover },
  { id: '15', rank: 15, prevRank: 16, title: 'Fullmetal Alchemist', author: 'Hiromu Arakawa', rating: 4.9, views: 260000, likes: 45000, trending: '+14%', cover: fullmetalAlchemistCover },
  { id: '16', rank: 16, prevRank: 18, title: 'Attack on Titan', author: 'Hajime Isayama', rating: 4.85, views: 245000, likes: 39000, trending: '+19%', cover: attackOnTitanCover },
];

const Trending = () => {
  const [timeRange, setTimeRange] = useState('This Week');

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
            <div className="p-2 rounded-xl gradient-hero">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              Trending <span className="gradient-text">Now</span>
            </h1>
          </div>
          <p className="text-muted-foreground">The hottest manga everyone's reading</p>
        </motion.div>

        {/* Time Range Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                timeRange === range
                  ? 'gradient-primary text-primary-foreground glow-primary'
                  : 'glass-hover'
              }`}
            >
              {range}
            </button>
          ))}
        </motion.div>

        {/* Top 3 Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {TRENDING_DATA.slice(0, 3).map((manga, index) => (
            <Link key={manga.id} to={`/manga/${manga.id}`}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative glass rounded-2xl p-6 overflow-hidden cursor-pointer ${
                  index === 0 ? 'glow-gold' : index === 1 ? 'glow-primary' : 'glow-accent'
                }`}
              >
              {/* Rank Badge */}
              <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl ${
                index === 0 ? 'bg-gradient-to-br from-gold to-electric-blue text-background' :
                index === 1 ? 'gradient-primary text-primary-foreground' :
                'gradient-accent text-accent-foreground'
              }`}>
                #{manga.rank}
              </div>

              {/* Cover */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img 
                  src={manga.cover} 
                  alt={manga.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="font-display font-bold text-xl mb-1">{manga.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{manga.author}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    {manga.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-coral" />
                    {(manga.likes / 1000).toFixed(0)}k
                  </span>
                </div>
                <span className="text-success text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {manga.trending}
                </span>
              </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Full Rankings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-lg">Full Rankings</h2>
          </div>

          <div className="divide-y divide-border">
            {TRENDING_DATA.map((manga, index) => {
              const rankChange = manga.prevRank - manga.rank;
              return (
                <Link key={manga.id} to={`/manga/${manga.id}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.3)' }}
                    className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
                  >
                  {/* Rank */}
                  <div className="w-12 text-center">
                    <span className={`font-display font-bold text-xl ${
                      manga.rank <= 3 ? 'gradient-text' : 'text-muted-foreground'
                    }`}>
                      {manga.rank}
                    </span>
                  </div>

                  {/* Rank Change */}
                  <div className="w-8">
                    {rankChange > 0 ? (
                      <span className="flex items-center text-success text-sm">
                        <ArrowUp className="w-4 h-4" />
                        {rankChange}
                      </span>
                    ) : rankChange < 0 ? (
                      <span className="flex items-center text-destructive text-sm">
                        <ArrowDown className="w-4 h-4" />
                        {Math.abs(rankChange)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </div>

                  {/* Cover Thumbnail */}
                  <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={manga.cover} 
                      alt={manga.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{manga.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{manga.author}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      {manga.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-coral" />
                      {(manga.likes / 1000).toFixed(0)}k
                    </span>
                    <span>{(manga.views / 1000000).toFixed(1)}M views</span>
                  </div>

                  {/* Trending */}
                  <span className="text-success text-sm font-semibold">
                    {manga.trending}
                  </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Trending;
