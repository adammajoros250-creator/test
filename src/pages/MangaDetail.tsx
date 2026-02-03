import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Heart, BookOpen, Clock, Users, MessageCircle, 
  ChevronDown, ChevronRight, Plus, Check, Bookmark, 
  Share2, Flag, ThumbsUp, ArrowLeft, Eye, Calendar
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';

// Import manga cover images
import chainsawManCover from '@/assets/manga/chainsaw-man.jpg';
import onePieceCover from '@/assets/manga/one-piece.jpg';
import jujutsuKaisenCover from '@/assets/manga/jujutsu-kaisen.jpg';
import spyXFamilyCover from '@/assets/manga/spy-x-family.jpg';
import blueLockCover from '@/assets/manga/blue-lock.jpg';
import dandadanCover from '@/assets/manga/dandadan.jpg';

const MANGA_DATABASE: Record<string, MangaDetail> = {
  '1': {
    id: '1',
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    artist: 'Tatsuki Fujimoto',
    cover: chainsawManCover,
    rating: 4.9,
    ratingCount: 125000,
    status: 'ongoing',
    releaseYear: 2018,
    genres: ['Action', 'Horror', 'Supernatural', 'Dark Fantasy'],
    chapters: 145,
    views: 12500000,
    favorites: 450000,
    synopsis: `Denji is a young boy who works as a Devil Hunter with his pet Devil, Pochita. Their living conditions are harsh, with Denji constantly working to pay off the huge debt his father left behind. However, his simple life is drastically changed when he is betrayed by the yakuza and killed.

Pochita merges with Denji's corpse, granting him the powers of the Chainsaw Devil. Now resurrected, Denji becomes the "Chainsaw Man" — a human with the ability to transform parts of his body into chainsaws. He is then recruited by the Public Safety Devil Hunters, a government organization that fights against Devils.

As Chainsaw Man, Denji must navigate the dangerous world of Devil Hunters while pursuing his simple dreams of living a normal life, eating good food, and finding love. But the more he learns about the world of Devils, the more he realizes that nothing is as simple as it seems.`,
    lastUpdated: '2 days ago',
  },
  '2': {
    id: '2',
    title: 'One Piece',
    author: 'Eiichiro Oda',
    artist: 'Eiichiro Oda',
    cover: onePieceCover,
    rating: 4.95,
    ratingCount: 580000,
    status: 'ongoing',
    releaseYear: 1997,
    genres: ['Adventure', 'Comedy', 'Fantasy', 'Action'],
    chapters: 1105,
    views: 210000000,
    favorites: 1250000,
    synopsis: `Gol D. Roger was known as the "Pirate King," the strongest and most infamous pirate to have sailed the Grand Line. His capture and execution by the World Government brought about a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece.

Monkey D. Luffy, a 17-year-old boy who defies the standard definition of a pirate. Rather than the stereotypical image of a mean-looking hardened criminal, Luffy is an optimistic youth with a body made of rubber after accidentally eating a Devil Fruit.

Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries, and battling powerful enemies, all in order to reach the most coveted of all fortunes — One Piece.`,
    lastUpdated: '3 days ago',
  },
};

// Default manga for unknown IDs
const DEFAULT_MANGA: MangaDetail = {
  id: '1',
  title: 'Chainsaw Man',
  author: 'Tatsuki Fujimoto',
  artist: 'Tatsuki Fujimoto',
  cover: chainsawManCover,
  rating: 4.9,
  ratingCount: 125000,
  status: 'ongoing',
  releaseYear: 2018,
  genres: ['Action', 'Horror', 'Supernatural', 'Dark Fantasy'],
  chapters: 145,
  views: 12500000,
  favorites: 450000,
  synopsis: `Denji is a young boy who works as a Devil Hunter with his pet Devil, Pochita. Their living conditions are harsh, with Denji constantly working to pay off the huge debt his father left behind.`,
  lastUpdated: '2 days ago',
};

interface MangaDetail {
  id: string;
  title: string;
  author: string;
  artist: string;
  cover: string;
  rating: number;
  ratingCount: number;
  status: 'ongoing' | 'completed' | 'hiatus';
  releaseYear: number;
  genres: string[];
  chapters: number;
  views: number;
  favorites: number;
  synopsis: string;
  lastUpdated: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  views: number;
}

interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  isLiked: boolean;
}

// Generate chapters
const generateChapters = (count: number): Chapter[] => {
  return Array.from({ length: Math.min(count, 20) }, (_, i) => ({
    id: `ch-${count - i}`,
    number: count - i,
    title: `Chapter ${count - i}`,
    releaseDate: i === 0 ? '2 days ago' : i < 5 ? `${i + 1} weeks ago` : `${Math.floor(i / 4)} months ago`,
    views: Math.floor(Math.random() * 500000) + 100000,
  }));
};

const REVIEWS: Review[] = [
  {
    id: '1',
    user: 'MangaFanatic42',
    avatar: '🎭',
    rating: 5,
    date: '3 days ago',
    content: 'This manga is absolutely incredible! The art style is unique and the story keeps you on the edge of your seat. The character development is phenomenal and every chapter leaves you wanting more.',
    likes: 234,
    isLiked: false,
  },
  {
    id: '2',
    user: 'OtakuReader',
    avatar: '🔥',
    rating: 5,
    date: '1 week ago',
    content: 'One of the best manga I\'ve ever read. The author really knows how to create tension and deliver satisfying payoffs. Highly recommended for anyone who loves action with deep themes.',
    likes: 189,
    isLiked: true,
  },
  {
    id: '3',
    user: 'CasualReader99',
    avatar: '📚',
    rating: 4,
    date: '2 weeks ago',
    content: 'Great manga overall! The pacing can be a bit slow at times but when the action kicks in, it\'s absolutely amazing. The world-building is top-notch.',
    likes: 156,
    isLiked: false,
  },
];

const LIST_OPTIONS = [
  { id: 'reading', label: 'Currently Reading', icon: BookOpen },
  { id: 'completed', label: 'Completed', icon: Check },
  { id: 'plan', label: 'Plan to Read', icon: Clock },
  { id: 'favorites', label: 'Favorites', icon: Heart },
];

const MangaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const manga = MANGA_DATABASE[id || '1'] || DEFAULT_MANGA;
  const chapters = generateChapters(manga.chapters);
  
  const [activeTab, setActiveTab] = useState<'chapters' | 'reviews'>('chapters');
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [reviews, setReviews] = useState(REVIEWS);

  const displayedChapters = showAllChapters ? chapters : chapters.slice(0, 10);

  const handleLikeReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, isLiked: !review.isLiked, likes: review.isLiked ? review.likes - 1 : review.likes + 1 }
        : review
    ));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background noise">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/explore">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Explore</span>
          </motion.button>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl overflow-hidden mb-8"
        >
          <div className="relative">
            {/* Background blur */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={manga.cover} 
                alt=""
                className="w-full h-full object-cover blur-2xl opacity-30 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
            </div>

            {/* Content */}
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Cover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="shrink-0 mx-auto md:mx-0"
              >
                <div className="w-48 md:w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-2 ring-border">
                  <img 
                    src={manga.cover} 
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    manga.status === 'ongoing' ? 'bg-success/20 text-success' :
                    manga.status === 'completed' ? 'bg-accent/20 text-accent' :
                    'bg-warning/20 text-warning'
                  }`}>
                    {manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}
                  </span>
                  {manga.genres.slice(0, 3).map(genre => (
                    <span key={genre} className="px-3 py-1 rounded-full text-xs bg-muted/50 backdrop-blur">
                      {genre}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  {manga.title}
                </h1>
                
                <p className="text-muted-foreground mb-4">
                  By <span className="text-foreground font-medium">{manga.author}</span>
                  {manga.artist !== manga.author && (
                    <span> • Art by <span className="text-foreground font-medium">{manga.artist}</span></span>
                  )}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-gold fill-gold" />
                    <span className="font-semibold">{manga.rating}</span>
                    <span className="text-muted-foreground">({formatNumber(manga.ratingCount)})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{manga.chapters} Chapters</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(manga.views)} Views</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(manga.favorites)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{manga.releaseYear}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Link to={`/read/${manga.id}/1`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl font-semibold gradient-primary text-primary-foreground flex items-center gap-2"
                    >
                      <BookOpen className="w-5 h-5" />
                      Start Reading
                    </motion.button>
                  </Link>

                  {/* Add to List */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowListDropdown(!showListDropdown)}
                      className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors ${
                        selectedList ? 'bg-primary/20 text-primary' : 'glass-hover'
                      }`}
                    >
                      {selectedList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {selectedList ? LIST_OPTIONS.find(l => l.id === selectedList)?.label : 'Add to List'}
                      <ChevronDown className={`w-4 h-4 transition-transform ${showListDropdown ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                      {showListDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute top-full mt-2 left-0 w-56 glass rounded-xl overflow-hidden shadow-xl z-10"
                        >
                          {LIST_OPTIONS.map(option => (
                            <button
                              key={option.id}
                              onClick={() => {
                                setSelectedList(selectedList === option.id ? null : option.id);
                                setShowListDropdown(false);
                              }}
                              className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                                selectedList === option.id 
                                  ? 'bg-primary/20 text-primary' 
                                  : 'hover:bg-muted/50'
                              }`}
                            >
                              <option.icon className="w-5 h-5" />
                              <span className="font-medium">{option.label}</span>
                              {selectedList === option.id && <Check className="w-4 h-4 ml-auto" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-3 rounded-xl transition-colors ${
                      isFavorited ? 'bg-electric-blue/20 text-electric-blue' : 'glass-hover'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-electric-blue' : ''}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl glass-hover"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                Synopsis
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {manga.synopsis}
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('chapters')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'chapters' 
                      ? 'gradient-primary text-primary-foreground' 
                      : 'glass-hover'
                  }`}
                >
                  Chapters ({manga.chapters})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'reviews' 
                      ? 'gradient-primary text-primary-foreground' 
                      : 'glass-hover'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* Chapters List */}
              {activeTab === 'chapters' && (
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Updated {manga.lastUpdated}
                    </p>
                    <button className="text-sm text-primary hover:underline">
                      Sort by Newest
                    </button>
                  </div>

                  <div className="divide-y divide-border">
                    {displayedChapters.map((chapter, index) => (
                      <Link key={chapter.id} to={`/read/${manga.id}/${chapter.number}`}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.3)' }}
                          className="flex items-center justify-between p-4 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-sm text-muted-foreground w-16">
                              Ch. {chapter.number}
                            </span>
                            <span className="font-medium">{chapter.title}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="hidden sm:block">{formatNumber(chapter.views)} views</span>
                            <span>{chapter.releaseDate}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  {chapters.length > 10 && (
                    <button
                      onClick={() => setShowAllChapters(!showAllChapters)}
                      className="w-full p-4 text-center text-primary hover:bg-muted/30 transition-colors font-medium"
                    >
                      {showAllChapters ? 'Show Less' : `Show All ${manga.chapters} Chapters`}
                    </button>
                  )}
                </div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {/* Write Review Button */}
                  <button className="w-full p-4 glass rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground">
                    <MessageCircle className="w-5 h-5 mx-auto mb-2" />
                    Write a Review
                  </button>

                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xl">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-semibold">{review.user}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{review.content}</p>

                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLikeReview(review.id)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            review.isLiked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${review.isLiked ? 'fill-primary' : ''}`} />
                          {review.likes}
                        </button>
                        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <Flag className="w-4 h-4" />
                          Report
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author</span>
                  <span className="font-medium">{manga.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Artist</span>
                  <span className="font-medium">{manga.artist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium capitalize">{manga.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{manga.releaseYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chapters</span>
                  <span className="font-medium">{manga.chapters}</span>
                </div>
              </div>
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {manga.genres.map(genre => (
                  <span 
                    key={genre}
                    className="px-3 py-1.5 rounded-lg text-sm bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                  >
                    {genre}
                  </span>
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
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-xl font-bold gradient-text">{formatNumber(manga.favorites)}</p>
                  <p className="text-xs text-muted-foreground">Favorites</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-xl font-bold gradient-text">{formatNumber(manga.views)}</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MangaDetail;