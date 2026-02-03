import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Bouncing dots loader - clean simple style matching reference
export function DotsLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-slate-400"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Spinning loader
export function SpinnerLoader({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  
  return (
    <div className={cn("relative", sizes[size], className)}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20"
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// Pulsing ring loader
export function PulseRingLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
          animate={{
            scale: [1, 2],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="absolute inset-4 rounded-full gradient-primary" />
    </div>
  );
}

// Skeleton with shimmer effect
export function SkeletonLoader({ 
  className, 
  variant = 'default' 
}: { 
  className?: string; 
  variant?: 'default' | 'card' | 'line' | 'circle' 
}) {
  const variants = {
    default: 'h-4 w-full rounded',
    card: 'h-32 w-full rounded-xl',
    line: 'h-3 w-3/4 rounded',
    circle: 'h-12 w-12 rounded-full',
  };

  return (
    <div className={cn("relative overflow-hidden bg-muted/50", variants[variant], className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Chart loading skeleton - clean centered dots style
export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-64 rounded-xl overflow-hidden bg-[#1a1f2e]", className)}>
      <DotsLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

// Data card loading skeleton
export function DataCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glass rounded-xl p-5 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <SkeletonLoader variant="line" className="w-24" />
        <SkeletonLoader variant="circle" className="w-8 h-8" />
      </div>
      <SkeletonLoader className="h-8 w-32" />
      <SkeletonLoader variant="line" className="w-16" />
    </div>
  );
}

// Full page loading overlay
export function FullPageLoader({ message }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
    >
      <PulseRingLoader className="mb-6" />
      {message && (
        <motion.p
          className="text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}

// Panel loading state - clean centered dots only
export function PanelLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-16 rounded-xl bg-[#1a1f2e]", className)}>
      <DotsLoader />
    </div>
  );
}
