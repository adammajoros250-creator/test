import { motion } from 'framer-motion';
import { Search, Filter, Star } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
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
import monsterCover from '@/assets/manga/monster.jpg';
import vagabondCover from '@/assets/manga/vagabond.jpg';
import kingdomCover from '@/assets/manga/kingdom.jpg';
import kaijuNo8Cover from '@/assets/manga/kaiju-no-8.jpg';
import deathNoteCover from '@/assets/manga/death-note.jpg';
import fullmetalAlchemistCover from '@/assets/manga/fullmetal-alchemist.jpg';
import attackOnTitanCover from '@/assets/manga/attack-on-titan.jpg';

const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports'];
const sortOptions = ['Popular', 'Latest', 'Rating', 'A-Z'];

const MANGA_DATA = [
  { id: '1', title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', rating: 4.9, chapters: 145, genre: 'Action', status: 'ongoing', cover: chainsawManCover },
  { id: '2', title: 'One Piece', author: 'Eiichiro Oda', rating: 4.95, chapters: 1105, genre: 'Adventure', status: 'ongoing', cover: onePieceCover },
  { id: '3', title: 'Jujutsu Kaisen', author: 'Gege Akutami', rating: 4.85, chapters: 250, genre: 'Action', status: 'ongoing', cover: jujutsuKaisenCover },
  { id: '4', title: 'Spy x Family', author: 'Tatsuya Endo', rating: 4.8, chapters: 95, genre: 'Comedy', status: 'ongoing', cover: spyXFamilyCover },
  { id: '5', title: 'Blue Lock', author: 'Muneyuki Kaneshiro', rating: 4.75, chapters: 240, genre: 'Sports', status: 'ongoing', cover: blueLockCover },
  { id: '6', title: 'Dandadan', author: 'Yukinobu Tatsu', rating: 4.7, chapters: 140, genre: 'Action', status: 'ongoing', cover: dandadanCover },
  { id: '7', title: 'Frieren', author: 'Kanehito Yamada', rating: 4.9, chapters: 120, genre: 'Fantasy', status: 'ongoing', cover: frierenCover },
  { id: '8', title: 'Vinland Saga', author: 'Makoto Yukimura', rating: 4.85, chapters: 200, genre: 'Action', status: 'ongoing', cover: vinlandSagaCover },
  { id: '9', title: 'Berserk', author: 'Kentaro Miura', rating: 4.95, chapters: 370, genre: 'Horror', status: 'ongoing', cover: berserkCover },
  { id: '10', title: 'Monster', author: 'Naoki Urasawa', rating: 4.9, chapters: 162, genre: 'Drama', status: 'completed', cover: monsterCover },
  { id: '11', title: 'Vagabond', author: 'Takehiko Inoue', rating: 4.9, chapters: 327, genre: 'Action', status: 'hiatus', cover: vagabondCover },
  { id: '12', title: 'Kingdom', author: 'Yasuhisa Hara', rating: 4.85, chapters: 780, genre: 'Action', status: 'ongoing', cover: kingdomCover },
  { id: '13', title: 'Kaiju No. 8', author: 'Naoya Matsumoto', rating: 4.7, chapters: 110, genre: 'Action', status: 'ongoing', cover: kaijuNo8Cover },
  { id: '14', title: 'Death Note', author: 'Tsugumi Ohba', rating: 4.85, chapters: 108, genre: 'Drama', status: 'completed', cover: deathNoteCover },
  { id: '15', title: 'Fullmetal Alchemist', author: 'Hiromu Arakawa', rating: 4.9, chapters: 116, genre: 'Fantasy', status: 'completed', cover: fullmetalAlchemistCover },
  { id: '16', title: 'Attack on Titan', author: 'Hajime Isayama', rating: 4.85, chapters: 139, genre: 'Action', status: 'completed', cover: attackOnTitanCover },
  { id: '17', title: 'My Hero Academia', author: 'Kohei Horikoshi', rating: 4.7, chapters: 430, genre: 'Action', status: 'completed', cover: jujutsuKaisenCover },
  { id: '18', title: 'Demon Slayer', author: 'Koyoharu Gotouge', rating: 4.75, chapters: 205, genre: 'Action', status: 'completed', cover: chainsawManCover },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  const filteredManga = MANGA_DATA.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manga.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || manga.genre === selectedGenre;
    return matchesSearch && matchesGenre;
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
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Explore <span className="gradient-text">Manga</span>
          </h1>
          <p className="text-muted-foreground">Discover your next favorite series</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search manga, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedGenre === genre
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Sort by:
            </span>
            <div className="flex gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    sortBy === option
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredManga.length} results
        </p>

        {/* Manga Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredManga.map((manga, index) => (
            <Link key={manga.id} to={`/manga/${manga.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
                <img 
                  src={manga.cover} 
                  alt={manga.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    manga.status === 'ongoing' ? 'bg-success/20 text-success' : 
                    manga.status === 'completed' ? 'bg-accent/20 text-accent' :
                    'bg-warning/20 text-warning'
                  }`}>
                    {manga.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 left-3 right-3">
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
              <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
                {manga.title}
              </h4>
              <p className="text-sm text-muted-foreground truncate">{manga.author}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 text-gold fill-gold" />
                <span>{manga.rating}</span>
                <span>•</span>
                <span>{manga.chapters} ch</span>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Explore;