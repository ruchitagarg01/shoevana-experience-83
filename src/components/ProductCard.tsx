
import { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/lib/products';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from '@/hooks/use-wishlist';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist, isLoading } = useWishlist(product.id);

  const handleAddToCart = () => {
    // Create cart item from product and add it to cart
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      toggleWishlist();
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast({
        title: "Error",
        description: "Could not update wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const formattedSalePrice = product.salePrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(product.salePrice)
    : null;

  return (
    <div
      className="group relative h-full rounded-xl overflow-hidden hover-lift bg-white dark:bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-secondary rounded-t-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Floating elements */}
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium rounded-md">
          New
        </div>
      )}

      {product.salePrice && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-md">
          Sale
        </div>
      )}

      <button
        onClick={handleWishlistClick}
        disabled={isLoading}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
          product.salePrice ? "top-12" : "top-3"
        } ${
          isInWishlist
            ? "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400"
            : "bg-white/80 text-gray-600 dark:bg-gray-800/80 dark:text-gray-400"
        } ${isLoading ? "opacity-50 cursor-wait" : ""} z-10`}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
        />
      </button>

      {/* Product Details */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="p-4">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              {formattedSalePrice ? (
                <>
                  <span className="text-red-500 font-medium">{formattedSalePrice}</span>
                  <span className="text-muted-foreground line-through ml-2 text-sm">
                    {formattedPrice}
                  </span>
                </>
              ) : (
                <span className="font-medium">{formattedPrice}</span>
              )}
            </div>
            
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-200 dark:border-gray-700"
                  style={{
                    backgroundColor: color.toLowerCase(),
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[8px] text-gray-700 dark:text-gray-300">
                  +{product.colors.length - 3}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2"
              variant="outline"
              size="sm"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      {/* Quick view overlay */}
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 text-center">
          <Link to={`/product/${product.id}`}>
            <Button variant="default" size="lg" className="rounded-lg mb-2">
              Quick View
            </Button>
          </Link>
          <Button onClick={handleAddToCart} variant="outline" size="lg" className="rounded-lg">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
