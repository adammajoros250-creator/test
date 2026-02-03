import { motion } from 'framer-motion';
import { User, Settings, BookOpen, Heart, Star, Clock, Award, Edit, Crown, Copy, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { TokenBalance } from '@/components/wallet/TokenBalance';
import { NFTGallery } from '@/components/nft/NFTGallery';
import { useMockAccount } from '@/hooks/useMockAccount';
import { useState } from 'react';

// Import manga cover images
import chainsawManCover from '@/assets/manga/chainsaw-man.jpg';
import jujutsuKaisenCover from '@/assets/manga/jujutsu-kaisen.jpg';
import onePieceCover from '@/assets/manga/one-piece.jpg';
import spyXFamilyCover from '@/assets/manga/spy-x-family.jpg';
import blueLockCover from '@/assets/manga/blue-lock.jpg';
import deathNoteCover from '@/assets/manga/death-note.jpg';
import fullmetalAlchemistCover from '@/assets/manga/fullmetal-alchemist.jpg';
import attackOnTitanCover from '@/assets/manga/attack-on-titan.jpg';
import dandadanCover from '@/assets/manga/dandadan.jpg';
import frierenCover from '@/assets/manga/frieren.jpg';
import vinlandSagaCover from '@/assets/manga/vinland-saga.jpg';
import berserkCover from '@/assets/manga/berserk.jpg';
import monsterCover from '@/assets/manga/monster.jpg';
import vagabondCover from '@/assets/manga/vagabond.jpg';
import kingdomCover from '@/assets/manga/kingdom.jpg';
import kaijuNo8Cover from '@/assets/manga/kaiju-no-8.jpg';

const tabs = ['Reading History', 'Reviews', 'Lists', 'NFTs', 'Activity'];

const READING_HISTORY = [
  { id: '1', title: 'Chainsaw Man', chapter: 145, lastRead: '2h ago', progress: 100, status: 'current', cover: chainsawManCover },
  { id: '2', title: 'Jujutsu Kaisen', chapter: 248, lastRead: '1d ago', progress: 99, status: 'current', cover: jujutsuKaisenCover },
  { id: '3', title: 'One Piece', chapter: 1105, lastRead: '2d ago', progress: 100, status: 'current', cover: onePieceCover },
  { id: '4', title: 'Spy x Family', chapter: 92, lastRead: '3d ago', progress: 97, status: 'current', cover: spyXFamilyCover },
  { id: '5', title: 'Blue Lock', chapter: 235, lastRead: '5d ago', progress: 98, status: 'current', cover: blueLockCover },
  { id: '6', title: 'Death Note', chapter: 108, lastRead: '1w ago', progress: 100, status: 'completed', cover: deathNoteCover },
  { id: '7', title: 'Fullmetal Alchemist', chapter: 116, lastRead: '2w ago', progress: 100, status: 'completed', cover: fullmetalAlchemistCover },
  { id: '8', title: 'Attack on Titan', chapter: 139, lastRead: '1mo ago', progress: 100, status: 'completed', cover: attackOnTitanCover },
  { id: '9', title: 'Dandadan', chapter: 138, lastRead: '1h ago', progress: 99, status: 'current', cover: dandadanCover },
  { id: '10', title: 'Frieren', chapter: 118, lastRead: '4h ago', progress: 98, status: 'current', cover: frierenCover },
  { id: '11', title: 'Vinland Saga', chapter: 198, lastRead: '1d ago', progress: 99, status: 'current', cover: vinlandSagaCover },
  { id: '12', title: 'Berserk', chapter: 365, lastRead: '3d ago', progress: 99, status: 'current', cover: berserkCover },
  { id: '13', title: 'Monster', chapter: 162, lastRead: '2w ago', progress: 100, status: 'completed', cover: monsterCover },
  { id: '14', title: 'Vagabond', chapter: 327, lastRead: '1mo ago', progress: 100, status: 'completed', cover: vagabondCover },
  { id: '15', title: 'Kingdom', chapter: 775, lastRead: '6h ago', progress: 99, status: 'current', cover: kingdomCover },
  { id: '16', title: 'Kaiju No. 8', chapter: 108, lastRead: '12h ago', progress: 98, status: 'current', cover: kaijuNo8Cover },
];

const USER_REVIEWS = [
  { id: '1', manga: 'Chainsaw Man', rating: 5, content: 'Absolutely incredible storytelling...', likes: 234, date: '2d ago' },
  { id: '2', manga: 'Frieren', rating: 5, content: 'A masterpiece of the fantasy genre...', likes: 189, date: '1w ago' },
  { id: '3', manga: 'Blue Lock', rating: 4, content: 'Best sports manga in years...', likes: 156, date: '2w ago' },
];

const USER_STATS = {
  mangaRead: 156,
  chaptersRead: 12450,
  reviews: 45,
  lists: 12,
  followers: 1234,
  following: 567,
  tokensEarned: 4500,
  badges: 8,
};

const Profile = () => {
  const { address, isConnected } = useMockAccount();
  const [activeTab, setActiveTab] = useState('Reading History');

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return (
    <div className="min-h-screen bg-background noise">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl gradient-primary flex items-center justify-center">
                <User className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              {/* Premium Badge */}
              <div className="absolute -top-2 -right-2">
                <span className="badge-premium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-display font-bold">MangaEnthusiast</h1>
                <span className="badge-nft">Manga Master</span>
              </div>
              
              {isConnected && truncatedAddress && (
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
                  <span className="font-mono">{truncatedAddress}</span>
                  <Copy className="w-4 h-4" />
                </button>
              )}

              <p className="text-muted-foreground mb-4 max-w-lg">
                Avid manga reader and collector. Love shonen and seinen genres. Always looking for hidden gems!
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined Jan 2024
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {USER_STATS.followers.toLocaleString()} followers
                </span>
                <span>
                  {USER_STATS.following} following
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-xl font-semibold gradient-primary text-primary-foreground"
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2.5 rounded-xl glass-hover"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
            <div className="text-center p-4 rounded-xl bg-muted/30">
              <p className="text-2xl font-bold gradient-text">{USER_STATS.mangaRead}</p>
              <p className="text-sm text-muted-foreground">Manga Read</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30">
              <p className="text-2xl font-bold gradient-text">{USER_STATS.chaptersRead.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Chapters</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30">
              <p className="text-2xl font-bold gradient-text">{USER_STATS.reviews}</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30">
              <p className="text-2xl font-bold gradient-text-gold">{USER_STATS.tokensEarned.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">MANGA Earned</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'gradient-primary text-primary-foreground'
                  : 'glass-hover'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'Reading History' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Reading History
                  </h2>
                  <div className="flex gap-2 text-sm">
                    <button className="px-3 py-1 rounded-lg bg-primary/20 text-primary">All</button>
                    <button className="px-3 py-1 rounded-lg text-muted-foreground hover:bg-muted">Current</button>
                    <button className="px-3 py-1 rounded-lg text-muted-foreground hover:bg-muted">Completed</button>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {READING_HISTORY.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      {/* Cover */}
                      <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={item.cover} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Chapter {item.chapter}
                        </p>
                      </div>

                      {/* Progress */}
                      <div className="hidden md:block w-24">
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full gradient-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-center">{item.progress}%</p>
                      </div>

                      {/* Status & Time */}
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'current' ? 'bg-accent/20 text-accent' : 'bg-success/20 text-success'
                        }`}>
                          {item.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          {item.lastRead}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {USER_REVIEWS.map((review) => (
                  <div key={review.id} className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Review of </span>
                        <span className="font-semibold text-primary">{review.manga}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">{review.content}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      {review.likes} likes
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'NFTs' && <NFTGallery />}

            {(activeTab === 'Lists' || activeTab === 'Activity') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <p className="text-muted-foreground">Coming soon...</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TokenBalance />

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-gold" />
                <h3 className="font-semibold">Recent Achievements</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Speed Reader', desc: 'Read 100 chapters in a week', icon: '⚡' },
                  { name: 'Critic', desc: 'Write 25 reviews', icon: '✍️' },
                  { name: 'Collector', desc: 'Own 5 NFT badges', icon: '🏆' },
                ].map((achievement) => (
                  <div key={achievement.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;