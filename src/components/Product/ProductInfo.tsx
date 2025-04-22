
import { useState } from 'react';
import { ShoppingBag, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';
import { useNavigate } from 'react-router-dom';

interface ProductInfoProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  colors: string[];
  isNew: boolean;
  averageRating: number;
  reviewCount: number;
  onAddToCart: () => void;
}

const ProductInfo = ({ 
  id, 
  name, 
  price, 
  salePrice, 
  category, 
  colors, 
  isNew,
  averageRating,
  reviewCount,
  onAddToCart 
}: ProductInfoProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isInWishlist, toggleWishlist } = useWishlist(id);
  
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  
  const formattedPrice = `₹${price.toFixed(2)}`;
  const formattedSalePrice = salePrice ? `₹${salePrice.toFixed(2)}` : null;
  
  return (
    <div>
      {isNew && (
        <div className="inline-block bg-black text-white px-3 py-1 text-xs font-semibold rounded-full mb-4">
          New Arrival
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          {Array(5).fill(0).map((_, index) => (
            <Star 
              key={index} 
              className={`h-4 w-4 ${
                index < Math.round(averageRating) 
                  ? 'fill-current text-yellow-500' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      
      <div className="mb-6">
        {formattedSalePrice ? (
          <div className="flex items-center">
            <span className="text-2xl font-bold text-red-500 mr-2">
              {formattedSalePrice}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              {formattedPrice}
            </span>
          </div>
        ) : (
          <span className="text-2xl font-bold">{formattedPrice}</span>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`
                w-10 h-10 rounded-full border-2
                ${selectedColor === color ? 'border-black dark:border-white' : 'border-transparent'}
              `}
              title={color}
            >
              <span 
                className="block w-full h-full rounded-full" 
                style={{ 
                  backgroundColor: color.toLowerCase(),
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
                }}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-2">Quantity</h3>
        <div className="flex items-center">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border rounded-l-md flex items-center justify-center"
            disabled={quantity <= 1}
          >
            -
          </button>
          <div className="w-16 h-10 border-t border-b flex items-center justify-center">
            {quantity}
          </div>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border rounded-r-md flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <Button size="lg" className="flex-1" onClick={onAddToCart}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className={isInWishlist ? "bg-red-50 text-red-500 border-red-200" : ""}
          onClick={toggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
        <Button size="lg" variant="outline">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-muted-foreground">
            Experience unparalleled comfort and style with the {name}. 
            Designed for {category.toLowerCase()} enthusiasts who demand both 
            performance and aesthetics. The premium materials ensure durability while 
            the ergonomic design provides all-day comfort.
          </p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Features</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Premium breathable upper material</li>
            <li>Cushioned insole for maximum comfort</li>
            <li>Durable outsole with excellent grip</li>
            <li>Lightweight design reduces fatigue</li>
            <li>Versatile style for various occasions</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Shipping & Returns</h3>
          <p className="text-muted-foreground">
            Free shipping on all orders over $100. Easy returns within 30 days of purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
