
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 blur-backdrop shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight">SHOEVANA</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">
              Home
            </a>
            <a href="/new-arrivals" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">
              New Arrivals
            </a>
            <a href="/men" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">
              Men
            </a>
            <a href="/women" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">
              Women
            </a>
            <a href="/collections" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">
              Collections
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </button>
            <button 
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <a href="/" className="block py-2 text-sm font-medium">Home</a>
            <a href="/new-arrivals" className="block py-2 text-sm font-medium">New Arrivals</a>
            <a href="/men" className="block py-2 text-sm font-medium">Men</a>
            <a href="/women" className="block py-2 text-sm font-medium">Women</a>
            <a href="/collections" className="block py-2 text-sm font-medium">Collections</a>
            <div className="pt-4">
              <Button className="w-full">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
