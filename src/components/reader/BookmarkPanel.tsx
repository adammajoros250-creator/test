import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X, Trash2, Edit3, Check, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark as BookmarkType } from '@/hooks/useBookmarks';

interface BookmarkPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkType[];
  currentMangaId: string;
  onRemoveBookmark: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onNavigateToBookmark: (chapterId: string, page: number) => void;
}

export function BookmarkPanel({
  isOpen,
  onClose,
  bookmarks,
  currentMangaId,
  onRemoveBookmark,
  onUpdateNote,
  onNavigateToBookmark,
}: BookmarkPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');

  const mangaBookmarks = bookmarks.filter(b => b.mangaId === currentMangaId);
  const otherBookmarks = bookmarks.filter(b => b.mangaId !== currentMangaId);

  const startEditing = (bookmark: BookmarkType) => {
    setEditingId(bookmark.id);
    setEditNote(bookmark.note);
  };

  const saveEdit = (bookmarkId: string) => {
    onUpdateNote(bookmarkId, editNote);
    setEditingId(null);
    setEditNote('');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-background z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg">Bookmarks</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookmarks.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookmarks yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click the bookmark icon while reading to save your place
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Current Manga Bookmarks */}
                  {mangaBookmarks.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        This Manga ({mangaBookmarks.length})
                      </h3>
                      <div className="space-y-2">
                        {mangaBookmarks.map((bookmark) => (
                          <motion.div
                            key={bookmark.id}
                            layout
                            className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <button
                                onClick={() => onNavigateToBookmark(bookmark.chapterId, bookmark.page)}
                                className="flex-1 text-left"
                              >
                                <p className="font-medium text-sm">
                                  Ch. {bookmark.chapterNumber} • Page {bookmark.page}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {bookmark.chapterTitle}
                                </p>
                              </button>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => startEditing(bookmark)}
                                  className="p-1.5 rounded hover:bg-background transition-colors"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                                </button>
                                <button
                                  onClick={() => onRemoveBookmark(bookmark.id)}
                                  className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                                </button>
                              </div>
                            </div>

                            {editingId === bookmark.id ? (
                              <div className="mt-2 flex gap-2">
                                <input
                                  type="text"
                                  value={editNote}
                                  onChange={(e) => setEditNote(e.target.value)}
                                  placeholder="Add a note..."
                                  className="flex-1 px-2 py-1 text-sm rounded bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveEdit(bookmark.id);
                                    if (e.key === 'Escape') setEditingId(null);
                                  }}
                                />
                                <button
                                  onClick={() => saveEdit(bookmark.id)}
                                  className="p-1.5 rounded bg-primary text-primary-foreground"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : bookmark.note ? (
                              <p className="mt-2 text-xs text-muted-foreground italic bg-background/50 p-2 rounded">
                                "{bookmark.note}"
                              </p>
                            ) : null}

                            <p className="text-[10px] text-muted-foreground mt-2">
                              {formatDate(bookmark.createdAt)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Manga Bookmarks */}
                  {otherBookmarks.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Other Manga ({otherBookmarks.length})
                      </h3>
                      <div className="space-y-2">
                        {otherBookmarks.slice(0, 5).map((bookmark) => (
                          <Link
                            key={bookmark.id}
                            to={`/read/${bookmark.mangaId}/${bookmark.chapterNumber}`}
                            className="block p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {bookmark.mangaTitle}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Ch. {bookmark.chapterNumber} • Page {bookmark.page}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
