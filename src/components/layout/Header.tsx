import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Vote, 
  Crown, 
  Search,
  Menu,
  X,
  User
} from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { SearchModal } from '@/components/search/SearchModal';
import { useState } from 'react';
import logo from '@/assets/mangaverse-logo.png';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Explore', href: '/explore', icon: BookOpen },
  { label: 'Trending', href: '/trending', icon: TrendingUp },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Governance', href: '/governance', icon: Vote },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MangaVerse" className="h-10 w-auto" />
            <span className="font-display font-bold text-xl gradient-text">
              MangaVerse
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl glass-hover hidden sm:flex items-center gap-2"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground hidden lg:inline">⌘K</span>
            </motion.button>

            {/* Search Modal */}
            <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

            {/* Premium Badge */}
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl glass-hover"
              >
                <Crown className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium">Premium</span>
              </motion.button>
            </Link>

            {/* Profile */}
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl glass-hover hidden sm:flex"
              >
                <User className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </Link>

            {/* Wallet */}
            <WalletButton />

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl glass-hover md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border/50"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
