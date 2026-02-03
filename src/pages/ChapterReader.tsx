import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Home, List, Settings, 
  Maximize, Minimize, BookOpen, ArrowLeft, Sun, Moon,
  ZoomIn, ZoomOut, RotateCcw, Bookmark, BookmarkCheck
} from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { BookmarkPanel } from '@/components/reader/BookmarkPanel';
import { AddBookmarkModal } from '@/components/reader/AddBookmarkModal';

// Import manga cover images for mock pages
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

// Mock page images for the reader (using covers as placeholders)
const MOCK_PAGES = [
  chainsawManCover,
  onePieceCover,
  jujutsuKaisenCover,
  spyXFamilyCover,
  blueLockCover,
  dandadanCover,
  frierenCover,
  vinlandSagaCover,
  berserkCover,
  kingdomCover,
];

interface ChapterInfo {
  id: string;
  number: number;
  title: string;
  pages: string[];
}

const MANGA_CHAPTERS: Record<string, ChapterInfo[]> = {
  '1': [
    { id: '1-1', number: 1, title: 'Dog & Chainsaw', pages: MOCK_PAGES },
    { id: '1-2', number: 2, title: 'The Place Where Pochita Is', pages: MOCK_PAGES },
    { id: '1-3', number: 3, title: 'Arrival in Tokyo', pages: MOCK_PAGES },
  ],
  '2': [
    { id: '2-1', number: 1, title: 'Romance Dawn', pages: MOCK_PAGES },
    { id: '2-2', number: 2, title: 'That Man, "Straw Hat Luffy"', pages: MOCK_PAGES },
  ],
};

// Manga title lookup
const MANGA_TITLES: Record<string, string> = {
  '1': 'Chainsaw Man',
  '2': 'One Piece',
};

const ChapterReader = () => {
  const { mangaId, chapterId } = useParams();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showBookmarkPanel, setShowBookmarkPanel] = useState(false);
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingMode, setReadingMode] = useState<'single' | 'double' | 'webtoon'>('single');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [zoom, setZoom] = useState(100);
  
  // Bookmarks
  const { 
    bookmarks, 
    addBookmark, 
    removeBookmark, 
    updateBookmarkNote, 
    isPageBookmarked,
    getPageBookmark 
  } = useBookmarks();
  
  // Get chapter data
  const chapters = MANGA_CHAPTERS[mangaId || '1'] || MANGA_CHAPTERS['1'];
  const currentChapter = chapters.find(c => c.number === Number(chapterId)) || chapters[0];
  const totalPages = currentChapter.pages.length;
  const mangaTitle = MANGA_TITLES[mangaId || '1'] || 'Unknown Manga';
  const isCurrentPageBookmarked = isPageBookmarked(mangaId || '1', chapterId || '1', currentPage);
  const currentPageBookmark = getPageBookmark(mangaId || '1', chapterId || '1', currentPage);
  
  // Reading progress
  const progress = (currentPage / totalPages) * 100;
  
  // Save reading progress to localStorage
  useEffect(() => {
    const key = `reading-progress-${mangaId}-${chapterId}`;
    localStorage.setItem(key, JSON.stringify({ page: currentPage, timestamp: Date.now() }));
  }, [currentPage, mangaId, chapterId]);
  
  // Load saved progress
  useEffect(() => {
    const key = `reading-progress-${mangaId}-${chapterId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const { page } = JSON.parse(saved);
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [mangaId, chapterId]);
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (showAddBookmark) return; // Don't navigate when modal is open
    
    if (e.key === 'ArrowRight' || e.key === 'd') {
      nextPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      prevPage();
    } else if (e.key === 'f') {
      toggleFullscreen();
    } else if (e.key === 'b') {
      setShowAddBookmark(true);
    } else if (e.key === 'Escape') {
      setShowChapterList(false);
      setShowBookmarkPanel(false);
    }
  }, [currentPage, totalPages, showAddBookmark]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Go to next chapter
      const currentIndex = chapters.findIndex(c => c.number === currentChapter.number);
      if (currentIndex < chapters.length - 1) {
        navigate(`/read/${mangaId}/${chapters[currentIndex + 1].number}`);
      }
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else {
      // Go to previous chapter
      const currentIndex = chapters.findIndex(c => c.number === currentChapter.number);
      if (currentIndex > 0) {
        const prevChapter = chapters[currentIndex - 1];
        navigate(`/read/${mangaId}/${prevChapter.number}`);
      }
    }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  // Handle adding bookmark
  const handleAddBookmark = (note: string) => {
    addBookmark({
      mangaId: mangaId || '1',
      mangaTitle,
      chapterId: chapterId || '1',
      chapterNumber: currentChapter.number,
      chapterTitle: currentChapter.title,
      page: currentPage,
      note,
      coverUrl: currentChapter.pages[0],
    });
  };
  
  // Navigate to bookmark
  const handleNavigateToBookmark = (bookmarkChapterId: string, page: number) => {
    if (bookmarkChapterId !== chapterId) {
      navigate(`/read/${mangaId}/${bookmarkChapterId}`);
    }
    setCurrentPage(page);
    setShowBookmarkPanel(false);
  };
  
  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, currentPage]);

  return (
    <div 
      className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-100'} relative select-none`}
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls(true)}
    >
      {/* Top Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={`/manga/${mangaId}`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </motion.button>
                </Link>
                <div>
                  <h1 className="text-white font-semibold truncate max-w-[200px] md:max-w-none">
                    Chapter {currentChapter.number}: {currentChapter.title}
                  </h1>
                  <p className="text-white/60 text-sm">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Bookmark Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddBookmark(true)}
                  className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                    isCurrentPageBookmarked 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  title="Add bookmark (B)"
                >
                  {isCurrentPageBookmarked ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-white" />
                  )}
                </motion.button>
                
                {/* View Bookmarks */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowBookmarkPanel(true)}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors relative"
                  title="View bookmarks"
                >
                  <Bookmark className="w-5 h-5 text-white" />
                  {bookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                      {bookmarks.length}
                    </span>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowChapterList(!showChapterList)}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <List className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5 text-white" /> : <Maximize className="w-5 h-5 text-white" />}
                </motion.button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Chapter List Sidebar */}
      <AnimatePresence>
        {showChapterList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowChapterList(false)}
            />
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-background z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Chapters</h2>
                  <button 
                    onClick={() => setShowChapterList(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        navigate(`/read/${mangaId}/${chapter.number}`);
                        setShowChapterList(false);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        chapter.number === currentChapter.number
                          ? 'gradient-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Chapter {chapter.number}</p>
                          <p className="text-sm opacity-80">{chapter.title}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Reader Area */}
      <div className="flex items-center justify-center min-h-screen pt-16 pb-24">
        {/* Left Navigation */}
        <button
          onClick={prevPage}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors opacity-0 hover:opacity-100"
          disabled={currentPage === 1 && chapters.findIndex(c => c.number === currentChapter.number) === 0}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Page Display */}
        <div 
          className="relative max-w-4xl w-full mx-auto px-4"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {readingMode === 'single' && (
                <img
                  src={currentChapter.pages[currentPage - 1]}
                  alt={`Page ${currentPage}`}
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto rounded-lg shadow-2xl"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (x > rect.width / 2) {
                      nextPage();
                    } else {
                      prevPage();
                    }
                  }}
                />
              )}
              
              {readingMode === 'double' && (
                <div className="flex gap-2 justify-center">
                  <img
                    src={currentChapter.pages[currentPage - 1]}
                    alt={`Page ${currentPage}`}
                    className="w-1/2 h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />
                  {currentPage < totalPages && (
                    <img
                      src={currentChapter.pages[currentPage]}
                      alt={`Page ${currentPage + 1}`}
                      className="w-1/2 h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                  )}
                </div>
              )}
              
              {readingMode === 'webtoon' && (
                <div className="flex flex-col items-center gap-0">
                  {currentChapter.pages.map((page, index) => (
                    <img
                      key={index}
                      src={page}
                      alt={`Page ${index + 1}`}
                      className="w-full max-w-2xl h-auto object-contain"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Navigation */}
        <button
          onClick={nextPage}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors opacity-0 hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Bottom Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.footer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="container mx-auto">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-white/60 text-sm w-12">{currentPage}</span>
                  <div className="flex-1 relative">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {/* Page Markers */}
                    <div className="absolute top-0 left-0 right-0 h-1 flex">
                      {currentChapter.pages.map((_, index) => (
                        <button
                          key={index}
                          className="flex-1 h-full cursor-pointer"
                          onClick={() => goToPage(index + 1)}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-white/60 text-sm w-12 text-right">{totalPages}</span>
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Reading Mode */}
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                    <button
                      onClick={() => setReadingMode('single')}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        readingMode === 'single' ? 'bg-primary text-primary-foreground' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Single
                    </button>
                    <button
                      onClick={() => setReadingMode('double')}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        readingMode === 'double' ? 'bg-primary text-primary-foreground' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Double
                    </button>
                    <button
                      onClick={() => setReadingMode('webtoon')}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        readingMode === 'webtoon' ? 'bg-primary text-primary-foreground' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Scroll
                    </button>
                  </div>
                </div>
                
                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-white" />
                  </motion.button>
                  <span className="text-white/60 text-sm w-12 text-center">{zoom}%</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setZoom(100)}
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevPage}
                    disabled={currentPage === 1 && chapters.findIndex(c => c.number === currentChapter.number) === 0}
                    className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white flex items-center gap-2 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPage}
                    className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
      
      {/* Keyboard Shortcuts Hint */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 text-white/40 text-xs flex items-center gap-4"
          >
            <span>← → or A D to navigate</span>
            <span>B to bookmark</span>
            <span>F for fullscreen</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bookmark Panel */}
      <BookmarkPanel
        isOpen={showBookmarkPanel}
        onClose={() => setShowBookmarkPanel(false)}
        bookmarks={bookmarks}
        currentMangaId={mangaId || '1'}
        onRemoveBookmark={removeBookmark}
        onUpdateNote={updateBookmarkNote}
        onNavigateToBookmark={handleNavigateToBookmark}
      />
      
      {/* Add Bookmark Modal */}
      <AddBookmarkModal
        isOpen={showAddBookmark}
        onClose={() => setShowAddBookmark(false)}
        onSave={handleAddBookmark}
        chapterNumber={currentChapter.number}
        chapterTitle={currentChapter.title}
        pageNumber={currentPage}
        existingNote={currentPageBookmark?.note}
      />
    </div>
  );
};

export default ChapterReader;
