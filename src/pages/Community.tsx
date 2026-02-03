import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, Bookmark, MoreHorizontal, TrendingUp, Award, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';

const tabs = ['Feed', 'Discussions', 'Reviews', 'Lists'];

const POSTS = [
  {
    id: '1',
    author: { name: 'MangaFan42', avatar: null, badge: 'Top Reviewer' },
    type: 'review',
    manga: 'Chainsaw Man',
    rating: 5,
    content: 'Just finished Part 2 and WOW. The way Fujimoto handles the themes of loss and identity is incredible. The art continues to push boundaries...',
    likes: 234,
    comments: 45,
    timestamp: '2h ago',
  },
  {
    id: '2',
    author: { name: 'OtakuLord', avatar: null, badge: 'Early Adopter' },
    type: 'discussion',
    title: 'Best shonen of the decade?',
    content: 'Let\'s settle this debate once and for all. What do you think is the best shonen manga of the 2020s? My vote goes to Jujutsu Kaisen for its unique power system and incredible fights.',
    likes: 567,
    comments: 189,
    timestamp: '4h ago',
  },
  {
    id: '3',
    author: { name: 'SakuraReader', avatar: null, badge: null },
    type: 'list',
    title: 'Hidden Gems You Need to Read',
    content: 'A curated list of underrated manga that deserve more attention. From slice of life to action, these series are criminally slept on!',
    items: ['Frieren', 'Dandadan', 'Kaiju No. 8', 'Sakamoto Days'],
    likes: 892,
    comments: 67,
    timestamp: '6h ago',
  },
  {
    id: '4',
    author: { name: 'ArtCritic99', avatar: null, badge: 'Manga Master' },
    type: 'review',
    manga: 'Vagabond',
    rating: 5,
    content: 'Takehiko Inoue\'s artwork in Vagabond is nothing short of masterful. Each panel could hang in a museum. The character development of Musashi is unparalleled...',
    likes: 1203,
    comments: 156,
    timestamp: '8h ago',
  },
];

const TOP_CONTRIBUTORS = [
  { name: 'MangaFan42', points: 12500, badge: 'Top Reviewer', reviews: 156 },
  { name: 'OtakuLord', points: 10200, badge: 'Early Adopter', reviews: 89 },
  { name: 'ArtCritic99', points: 9800, badge: 'Manga Master', reviews: 234 },
  { name: 'SakuraReader', points: 7500, badge: null, reviews: 45 },
  { name: 'NinjaReader', points: 6200, badge: null, reviews: 78 },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('Feed');

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
            <div className="p-2 rounded-xl gradient-accent">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="gradient-text">Community</span> Hub
            </h1>
          </div>
          <p className="text-muted-foreground">Connect with fellow manga enthusiasts</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
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

            {/* Posts */}
            <div className="space-y-4">
              {POSTS.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 hover-lift"
                >
                  {/* Author */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center font-semibold">
                        {post.author.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author.name}</span>
                          {post.author.badge && (
                            <span className="badge-premium text-xs">{post.author.badge}</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Content */}
                  {post.type === 'review' && (
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground">Review of </span>
                      <span className="font-semibold text-primary">{post.manga}</span>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < post.rating ? 'text-gold' : 'text-muted'}>★</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(post.type === 'discussion' || post.type === 'list') && (
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  )}

                  <p className="text-muted-foreground mb-4">{post.content}</p>

                  {post.type === 'list' && post.items && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.items.map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full bg-muted text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-electric-blue transition-colors">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      <Bookmark className="w-4 h-4" />
                      Save
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-success transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-gold" />
                <h3 className="font-semibold">Top Contributors</h3>
              </div>

              <div className="space-y-3">
                {TOP_CONTRIBUTORS.map((user, index) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <span className={`w-6 text-center font-bold ${
                      index < 3 ? 'gradient-text' : 'text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold">
                      {user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.points.toLocaleString()} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Trending Topics</h3>
              </div>

              <div className="space-y-3">
                {['#ChainsawMan', '#OnePiece1100', '#BestShonen', '#MangaArt', '#NewReleases'].map((topic) => (
                  <button
                    key={topic}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-primary"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold gradient-text">125K</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold gradient-text">45K</p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold gradient-text">890</p>
                  <p className="text-xs text-muted-foreground">Online Now</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold gradient-text">12K</p>
                  <p className="text-xs text-muted-foreground">Lists</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
