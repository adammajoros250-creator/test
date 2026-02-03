import { useState, useEffect, useCallback } from 'react';

export interface Bookmark {
  id: string;
  mangaId: string;
  mangaTitle: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  page: number;
  note: string;
  createdAt: number;
  coverUrl?: string;
}

const STORAGE_KEY = 'mangaverse-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
  }, []);

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
  }, []);

  // Add a bookmark
  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${bookmark.mangaId}-${bookmark.chapterId}-${bookmark.page}-${Date.now()}`,
      createdAt: Date.now(),
    };
    
    // Check if bookmark already exists for this exact location
    const exists = bookmarks.some(
      b => b.mangaId === bookmark.mangaId && 
           b.chapterId === bookmark.chapterId && 
           b.page === bookmark.page
    );
    
    if (exists) {
      // Update existing bookmark
      const updated = bookmarks.map(b => 
        b.mangaId === bookmark.mangaId && 
        b.chapterId === bookmark.chapterId && 
        b.page === bookmark.page
          ? { ...b, note: bookmark.note, createdAt: Date.now() }
          : b
      );
      saveBookmarks(updated);
      return;
    }
    
    saveBookmarks([newBookmark, ...bookmarks]);
  }, [bookmarks, saveBookmarks]);

  // Remove a bookmark
  const removeBookmark = useCallback((bookmarkId: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== bookmarkId));
  }, [bookmarks, saveBookmarks]);

  // Update bookmark note
  const updateBookmarkNote = useCallback((bookmarkId: string, note: string) => {
    saveBookmarks(
      bookmarks.map(b => b.id === bookmarkId ? { ...b, note } : b)
    );
  }, [bookmarks, saveBookmarks]);

  // Check if a page is bookmarked
  const isPageBookmarked = useCallback((mangaId: string, chapterId: string, page: number) => {
    return bookmarks.some(
      b => b.mangaId === mangaId && b.chapterId === chapterId && b.page === page
    );
  }, [bookmarks]);

  // Get bookmark for a specific page
  const getPageBookmark = useCallback((mangaId: string, chapterId: string, page: number) => {
    return bookmarks.find(
      b => b.mangaId === mangaId && b.chapterId === chapterId && b.page === page
    );
  }, [bookmarks]);

  // Get bookmarks for a specific manga
  const getMangaBookmarks = useCallback((mangaId: string) => {
    return bookmarks.filter(b => b.mangaId === mangaId);
  }, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmarkNote,
    isPageBookmarked,
    getPageBookmark,
    getMangaBookmarks,
  };
}
