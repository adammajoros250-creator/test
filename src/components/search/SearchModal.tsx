import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, User, Tag, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

// Import manga cover images
import chainsawManCover from '@/assets/manga/chainsaw-man.jpg';
import onePieceCover from '@/assets/manga/one-piece.jpg';
import jujutsuKaisenCover from '@/assets/manga/jujutsu-kaisen.jpg';
import spyXFamilyCover from '@/assets/manga/spy-x-family.jpg';
import blueLockCover from '@/assets/manga/blue-lock.jpg';
import dandadanCover from '@/assets/manga/dandadan.jpg';
import attackOnTitanCover from '@/assets/manga/attack-on-titan.jpg';
import deathNoteCover from '@/assets/manga/death-note.jpg';
import berserkCover from '@/assets/manga/berserk.jpg';
import vinlandSagaCover from '@/assets/manga/vinland-saga.jpg';
import vagabondCover from '@/assets/manga/vagabond.jpg';
import monsterCover from '@/assets/manga/monster.jpg';
import frierenCover from '@/assets/manga/frieren.jpg';
import kaijuNo8Cover from '@/assets/manga/kaiju-no-8.jpg';
import kingdomCover from '@/assets/manga/kingdom.jpg';
import fullmetalAlchemistCover from '@/assets/manga/fullmetal-alchemist.jpg';

interface MangaItem {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genres: string[];
  status: 'ongoing' | 'completed';
  chapters: number;
}

// Comprehensive manga database for search
const MANGA_DATABASE: MangaItem[] = [
  { id: '1', title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', cover: chainsawManCover, rating: 4.9, genres: ['Action', 'Horror', 'Supernatural'], status: 'ongoing', chapters: 145 },
  { id: '2', title: 'One Piece', author: 'Eiichiro Oda', cover: onePieceCover, rating: 4.95, genres: ['Adventure', 'Comedy', 'Fantasy'], status: 'ongoing', chapters: 1105 },
  { id: '3', title: 'Jujutsu Kaisen', author: 'Gege Akutami', cover: jujutsuKaisenCover, rating: 4.8, genres: ['Action', 'Supernatural', 'Horror'], status: 'ongoing', chapters: 253 },
  { id: '4', title: 'Spy x Family', author: 'Tatsuya Endo', cover: spyXFamilyCover, rating: 4.7, genres: ['Comedy', 'Action', 'Slice of Life'], status: 'ongoing', chapters: 98 },
  { id: '5', title: 'Blue Lock', author: 'Muneyuki Kaneshiro', cover: blueLockCover, rating: 4.6, genres: ['Sports', 'Drama', 'Psychological'], status: 'ongoing', chapters: 245 },
  { id: '6', title: 'Dandadan', author: 'Yukinobu Tatsu', cover: dandadanCover, rating: 4.8, genres: ['Action', 'Comedy', 'Supernatural'], status: 'ongoing', chapters: 142 },
  { id: '7', title: 'Attack on Titan', author: 'Hajime Isayama', cover: attackOnTitanCover, rating: 4.9, genres: ['Action', 'Drama', 'Dark Fantasy'], status: 'completed', chapters: 139 },
  { id: '8', title: 'Death Note', author: 'Tsugumi Ohba', cover: deathNoteCover, rating: 4.85, genres: ['Thriller', 'Supernatural', 'Psychological'], status: 'completed', chapters: 108 },
  { id: '9', title: 'Berserk', author: 'Kentaro Miura', cover: berserkCover, rating: 4.95, genres: ['Dark Fantasy', 'Action', 'Horror'], status: 'ongoing', chapters: 374 },
  { id: '10', title: 'Vinland Saga', author: 'Makoto Yukimura', cover: vinlandSagaCover, rating: 4.85, genres: ['Historical', 'Action', 'Drama'], status: 'ongoing', chapters: 203 },
  { id: '11', title: 'Vagabond', author: 'Takehiko Inoue', cover: vagabondCover, rating: 4.9, genres: ['Historical', 'Action', 'Drama'], status: 'ongoing', chapters: 327 },
  { id: '12', title: 'Monster', author: 'Naoki Urasawa', cover: monsterCover, rating: 4.9, genres: ['Thriller', 'Mystery', 'Psychological'], status: 'completed', chapters: 162 },
  { id: '13', title: 'Frieren: Beyond Journey\'s End', author: 'Kanehito Yamada', cover: frierenCover, rating: 4.8, genres: ['Fantasy', 'Adventure', 'Drama'], status: 'ongoing', chapters: 126 },
  { id: '14', title: 'Kaiju No. 8', author: 'Naoya Matsumoto', cover: kaijuNo8Cover, rating: 4.6, genres: ['Action', 'Sci-Fi', 'Comedy'], status: 'ongoing', chapters: 105 },
  { id: '15', title: 'Kingdom', author: 'Yasuhisa Hara', cover: kingdomCover, rating: 4.85, genres: ['Historical', 'Action', 'War'], status: 'ongoing', chapters: 780 },
  { id: '16', title: 'Fullmetal Alchemist', author: 'Hiromu Arakawa', cover: fullmetalAlchemistCover, rating: 4.9, genres: ['Action', 'Adventure', 'Fantasy'], status: 'completed', chapters: 116 },
];

// Get all unique genres
const ALL_GENRES = Array.from(
  new Set(MANGA_DATABASE.flatMap(manga => manga.genres))
).sort();

// Get all unique authors
const ALL_AUTHORS = Array.from(
  new Set(MANGA_DATABASE.map(manga => manga.author))
).sort();

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('mangaverse-recent-searches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save search to recent
  const saveRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('mangaverse-recent-searches', JSON.stringify(updated));
  }, [recentSearches]);

  // Filter manga by query
  const filteredManga = query.length > 0
    ? MANGA_DATABASE.filter(manga =>
        manga.title.toLowerCase().includes(query.toLowerCase()) ||
        manga.author.toLowerCase().includes(query.toLowerCase()) ||
        manga.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Filter genres by query
  const filteredGenres = query.length > 0
    ? ALL_GENRES.filter(genre =>
        genre.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Filter authors by query
  const filteredAuthors = query.length > 0
    ? ALL_AUTHORS.filter(author =>
        author.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelect = (value: string) => {
    saveRecentSearch(query);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b border-border px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search manga, authors, or genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded hover:bg-muted"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      
      <CommandList className="max-h-[400px]">
        {query.length === 0 ? (
          <>
            {/* Trending Section */}
            <CommandGroup heading="Trending Now">
              {MANGA_DATABASE.slice(0, 4).map((manga) => (
                <Link 
                  key={manga.id} 
                  to={`/manga/${manga.id}`}
                  onClick={() => handleSelect(manga.title)}
                >
                  <CommandItem className="cursor-pointer">
                    <div className="flex items-center gap-3 w-full">
                      <img 
                        src={manga.cover} 
                        alt={manga.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{manga.title}</p>
                        <p className="text-xs text-muted-foreground">{manga.author}</p>
                      </div>
                      <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                    </div>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((search, idx) => (
                  <CommandItem 
                    key={idx} 
                    onSelect={() => setQuery(search)}
                    className="cursor-pointer"
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Popular Genres */}
            <CommandGroup heading="Popular Genres">
              <div className="flex flex-wrap gap-2 p-2">
                {ALL_GENRES.slice(0, 8).map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setQuery(genre)}
                    className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </CommandGroup>
          </>
        ) : (
          <>
            {filteredManga.length === 0 && filteredGenres.length === 0 && filteredAuthors.length === 0 ? (
              <CommandEmpty>
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">No results found for "{query}"</p>
                  <p className="text-xs text-muted-foreground mt-1">Try searching for manga titles, authors, or genres</p>
                </div>
              </CommandEmpty>
            ) : (
              <>
                {/* Manga Results */}
                {filteredManga.length > 0 && (
                  <CommandGroup heading={`Manga (${filteredManga.length})`}>
                    {filteredManga.slice(0, 6).map((manga) => (
                      <Link 
                        key={manga.id} 
                        to={`/manga/${manga.id}`}
                        onClick={() => handleSelect(manga.title)}
                      >
                        <CommandItem className="cursor-pointer">
                          <div className="flex items-center gap-3 w-full">
                            <img 
                              src={manga.cover} 
                              alt={manga.title}
                              className="w-10 h-14 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{manga.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{manga.author}</span>
                                <span>•</span>
                                <span className={manga.status === 'ongoing' ? 'text-green-500' : 'text-blue-500'}>
                                  {manga.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                              <BookOpen className="w-3 h-3" />
                              <span>{manga.chapters}</span>
                            </div>
                          </div>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                )}

                {/* Author Results */}
                {filteredAuthors.length > 0 && (
                  <CommandGroup heading={`Authors (${filteredAuthors.length})`}>
                    {filteredAuthors.slice(0, 3).map((author) => {
                      const authorManga = MANGA_DATABASE.filter(m => m.author === author);
                      return (
                        <CommandItem 
                          key={author} 
                          onSelect={() => setQuery(author)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">{author}</p>
                              <p className="text-xs text-muted-foreground">
                                {authorManga.length} manga
                              </p>
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}

                {/* Genre Results */}
                {filteredGenres.length > 0 && (
                  <CommandGroup heading={`Genres (${filteredGenres.length})`}>
                    {filteredGenres.slice(0, 4).map((genre) => {
                      const genreManga = MANGA_DATABASE.filter(m => m.genres.includes(genre));
                      return (
                        <Link
                          key={genre}
                          to={`/explore?genre=${encodeURIComponent(genre)}`}
                          onClick={() => handleSelect(genre)}
                        >
                          <CommandItem className="cursor-pointer">
                            <div className="flex items-center gap-3 w-full">
                              <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center">
                                <Tag className="w-5 h-5 text-accent-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{genre}</p>
                                <p className="text-xs text-muted-foreground">
                                  {genreManga.length} manga
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        </Link>
                      );
                    })}
                  </CommandGroup>
                )}
              </>
            )}
          </>
        )}
      </CommandList>

      {/* Footer with keyboard shortcut hint */}
      <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Search across all manga</span>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">ESC</kbd>
          <span>to close</span>
        </div>
      </div>
    </CommandDialog>
  );
}
