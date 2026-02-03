import { motion } from 'framer-motion';
import { Star, TrendingUp, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import manga cover images
import chainsawManCover from '@/assets/manga/chainsaw-man.jpg';
import onePieceCover from '@/assets/manga/one-piece.jpg';
import jujutsuKaisenCover from '@/assets/manga/jujutsu-kaisen.jpg';
import spyXFamilyCover from '@/assets/manga/spy-x-family.jpg';
import blueLockCover from '@/assets/manga/blue-lock.jpg';
import dandadanCover from '@/assets/manga/dandadan.jpg';
import frierenCover from '@/assets/manga/frieren.jpg';
import vinlandSagaCover from '@/assets/manga/vinland-saga.jpg';
import berserkCover from '@/assets/manga/berserk.jpg';
import kingdomCover from '@/assets/manga/kingdom.jpg';
import kaijuNo8Cover from '@/assets/manga/kaiju-no-8.jpg';
import attackOnTitanCover from '@/assets/manga/attack-on-titan.jpg';

interface MangaItem {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  chapters: number;
  status: 'ongoing' | 'completed';
  genres: string[];
  likes: number;
  comments: number;
}

const TRENDING_MANGA: MangaItem[] = [
  {
    id: '1',
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    coverUrl: chainsawManCover,
    rating: 4.9,
    chapters: 145,
    status: 'ongoing',
    genres: ['Action', 'Horror', 'Supernatural'],
    likes: 45200,
    comments: 3420,
  },
  {
    id: '2',
    title: 'One Piece',
    author: 'Eiichiro Oda',
    coverUrl: onePieceCover,
    rating: 4.95,
    chapters: 1105,
    status: 'ongoing',
    genres: ['Adventure', 'Comedy', 'Fantasy'],
    likes: 125000,
    comments: 15200,
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen',
    author: 'Gege Akutami',
    coverUrl: jujutsuKaisenCover,
    rating: 4.85,
    chapters: 250,
    status: 'ongoing',
    genres: ['Action', 'Supernatural'],
    likes: 78500,
    comments: 8900,
  },
  {
    id: '4',
    title: 'Spy x Family',
    author: 'Tatsuya Endo',
    coverUrl: spyXFamilyCover,
    rating: 4.8,
    chapters: 95,
    status: 'ongoing',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    likes: 56000,
    comments: 4200,
  },
  {
    id: '5',
    title: 'Blue Lock',
    author: 'Muneyuki Kaneshiro',
    coverUrl: blueLockCover,
    rating: 4.75,
    chapters: 240,
    status: 'ongoing',
    genres: ['Sports', 'Drama'],
    likes: 42000,
    comments: 3100,
  },
  {
    id: '6',
    title: 'Dandadan',
    author: 'Yukinobu Tatsu',
    coverUrl: dandadanCover,
    rating: 4.7,
    chapters: 140,
    status: 'ongoing',
    genres: ['Action', 'Comedy', 'Supernatural'],
    likes: 38000,
    comments: 2800,
  },
  {
    id: '7',
    title: 'Frieren',
    author: 'Kanehito Yamada',
    coverUrl: frierenCover,
    rating: 4.9,
    chapters: 120,
    status: 'ongoing',
    genres: ['Fantasy', 'Adventure', 'Drama'],
    likes: 48000,
    comments: 4100,
  },
  {
    id: '8',
    title: 'Vinland Saga',
    author: 'Makoto Yukimura',
    coverUrl: vinlandSagaCover,
    rating: 4.85,
    chapters: 200,
    status: 'ongoing',
    genres: ['Action', 'Historical', 'Drama'],
    likes: 35000,
    comments: 2900,
  },
  {
    id: '9',
    title: 'Berserk',
    author: 'Kentaro Miura',
    coverUrl: berserkCover,
    rating: 4.95,
    chapters: 370,
    status: 'ongoing',
    genres: ['Action', 'Horror', 'Fantasy'],
    likes: 52000,
    comments: 5200,
  },
  {
    id: '10',
    title: 'Kingdom',
    author: 'Yasuhisa Hara',
    coverUrl: kingdomCover,
    rating: 4.85,
    chapters: 780,
    status: 'ongoing',
    genres: ['Action', 'Historical', 'War'],
    likes: 32000,
    comments: 2400,
  },
  {
    id: '11',
    title: 'Kaiju No. 8',
    author: 'Naoya Matsumoto',
    coverUrl: kaijuNo8Cover,
    rating: 4.7,
    chapters: 110,
    status: 'ongoing',
    genres: ['Action', 'Sci-Fi', 'Monster'],
    likes: 28000,
    comments: 2100,
  },
  {
    id: '12',
    title: 'Attack on Titan',
    author: 'Hajime Isayama',
    coverUrl: attackOnTitanCover,
    rating: 4.85,
    chapters: 139,
    status: 'completed',
    genres: ['Action', 'Dark Fantasy', 'Post-apocalyptic'],
    likes: 89000,
    comments: 12500,
  },
];

function MangaCard({ manga, index }: { manga: MangaItem; index: number }) {
  return (
    <Link to={`/manga/${manga.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative cursor-pointer"
      >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
        <img 
          src={manga.coverUrl} 
          alt={manga.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Rank badge */}
        <div className="absolute top-2 left-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center font-bold text-sm text-primary-foreground">
            {index + 1}
          </div>
        </div>

        {/* Status */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            manga.status === 'ongoing' 
              ? 'bg-success/20 text-success' 
              : 'bg-accent/20 text-accent'
          }`}>
            {manga.status}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {manga.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="px-2 py-0.5 rounded-full text-xs bg-muted/80 backdrop-blur">
                  {genre}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 rounded-lg text-sm font-semibold gradient-primary text-primary-foreground"
            >
              Read Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Info */}
      <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
        {manga.title}
      </h4>
      <p className="text-sm text-muted-foreground truncate">{manga.author}</p>

      {/* Stats */}
      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-gold fill-gold" />
          <span>{manga.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-electric-blue" />
          <span>{(manga.likes / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          <span>{(manga.comments / 1000).toFixed(1)}k</span>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}

export function TrendingManga() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl gradient-hero">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Trending Now</h3>
            <p className="text-sm text-muted-foreground">Most popular this week</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/20 text-primary">
            All
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Shonen
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Seinen
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {TRENDING_MANGA.map((manga, index) => (
          <MangaCard key={manga.id} manga={manga} index={index} />
        ))}
      </div>
    </motion.div>
  );
}