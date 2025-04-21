import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/lib/products';
import { ShoppingBag, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewForm from '@/components/Reviews/ReviewForm';
import ReviewList from '@/components/Reviews/ReviewList';
import type { Review, ReviewFormData } from '@/types/review';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const product = getProductById(id || '');
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('product_id', id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data as Review[] || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Error",
          description: "Failed to load reviews",
          variant: "destructive",
        });
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id, toast]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate('/browse')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: quantity
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedColor}) has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const handleReviewSubmit = async (data: ReviewFormData) => {
    if (!id || !user) return;

    try {
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: id,
          user_id: user.id,
          rating: data.rating,
          review_text: data.review_text,
        });

      if (error) throw error;

      const { data: newReviews } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      setReviews(newReviews as Review[] || []);
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
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

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <button onClick={() => navigate(-1)} className="flex items-center hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/browse')} className="hover:text-foreground">
              All Products
            </button>
            <span className="mx-2">/</span>
            <button 
              onClick={() => navigate(`/category/${product.category.toLowerCase()}`)} 
              className="hover:text-foreground"
            >
              {product.category}
            </button>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {Array(4).fill(0).map((_, index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              {product.isNew && (
                <div className="inline-block bg-black text-white px-3 py-1 text-xs font-semibold rounded-full mb-4">
                  New Arrival
                </div>
              )}
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {Array(5).fill(0).map((_, index) => (
                    <Star 
                      key={index} 
                      className={`h-4 w-4 ${index < 4 ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">42 reviews</span>
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
                  {product.colors.map((color) => (
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
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={isWishlisted ? "bg-red-50 text-red-500 border-red-200" : ""}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    Experience unparalleled comfort and style with the {product.name}. 
                    Designed for {product.category.toLowerCase()} enthusiasts who demand both 
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
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            {reviews.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(averageRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {reviews.length} reviews
                </p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <ReviewForm productId={id || ''} onSubmit={handleReviewSubmit} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              {isLoadingReviews ? (
                <div className="text-center py-8">Loading reviews...</div>
              ) : (
                <ReviewList reviews={reviews} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleProduct;
