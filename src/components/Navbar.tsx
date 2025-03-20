
import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, User, LogOut, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext"; 
import { Link, useNavigate } from "react-router-dom";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleTrackOrderClick = () => {
    navigate("/track-order");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-black/80 blur-backdrop shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight">SHOEVANA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">Home</Link>
            <Link to="/new-arrivals" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">New Arrivals</Link>
            <Link to="/men" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">Men</Link>
            <Link to="/women" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">Women</Link>
            <Link to="/browse" className="text-sm font-medium hover:opacity-70 transition-opacity relative story-link">Shop All</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </button>
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="hidden md:block mr-2 text-sm font-medium">Hi, {user?.name}</div>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" onClick={handleLogoutClick}>
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button className="p-2 rounded-full hover:bg-secondary transition-colors" onClick={handleLoginClick}>
                <User className="h-5 w-5" />
              </button>
            )}
            {/* Track Order Icon */}
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={handleTrackOrderClick}
              title="Track Order"
            >
              <Truck className="h-5 w-5" />
            </button>
            {/* Cart Icon */}
            <button className="p-2 rounded-full hover:bg-secondary transition-colors relative" onClick={handleCartClick}>
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <Link to="/" className="block py-2 text-sm font-medium">Home</Link>
            <Link to="/new-arrivals" className="block py-2 text-sm font-medium">New Arrivals</Link>
            <Link to="/men" className="block py-2 text-sm font-medium">Men</Link>
            <Link to="/women" className="block py-2 text-sm font-medium">Women</Link>
            <Link to="/browse" className="block py-2 text-sm font-medium">Shop All</Link>
            <Link to="/track-order" className="block py-2 text-sm font-medium">Track Order</Link>
            <Link to="/cart" className="block py-2 text-sm font-medium">Cart</Link>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Navbar;
