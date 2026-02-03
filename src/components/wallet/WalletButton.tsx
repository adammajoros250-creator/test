import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

export function WalletButton() {
  const handleConnect = () => {
    toast.info('Wallet connection is disabled in this preview mode.', {
      description: 'The app is running in a purely visual mode.',
    });
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConnect}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold gradient-primary text-primary-foreground glow-primary transition-all duration-300"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </motion.button>
    </div>
  );
}
