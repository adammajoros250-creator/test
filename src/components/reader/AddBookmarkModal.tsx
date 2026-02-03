import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X } from 'lucide-react';
import { useState } from 'react';

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  chapterNumber: number;
  chapterTitle: string;
  pageNumber: number;
  existingNote?: string;
}

export function AddBookmarkModal({
  isOpen,
  onClose,
  onSave,
  chapterNumber,
  chapterTitle,
  pageNumber,
  existingNote = '',
}: AddBookmarkModalProps) {
  const [note, setNote] = useState(existingNote);

  const handleSave = () => {
    onSave(note);
    setNote('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl gradient-primary">
                    <Bookmark className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Add Bookmark</h3>
                    <p className="text-xs text-muted-foreground">
                      Chapter {chapterNumber} • Page {pageNumber}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {chapterTitle}
                </p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Add a note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g., Amazing fight scene! or Important plot point..."
                    className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                    maxLength={200}
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {note.length}/200
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
                  >
                    <Bookmark className="w-4 h-4" />
                    Save Bookmark
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
