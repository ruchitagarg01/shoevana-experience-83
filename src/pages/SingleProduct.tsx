
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/lib/products';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import type { Review } from '@/types/review';
import { useAuth } from '@/contexts/AuthContext';

// Import the new components
import ProductImages from '@/components/Product/ProductImages';
import ProductInfo from '@/components/Product/ProductInfo';
import ProductReviews from '@/components/Product/ProductReviews';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const product = getProductById(id || '');
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} added to your cart`,
    });
  };
  
  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const fetchReviews = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setReviews(data as Review[]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            {/* Product Images Section */}
            <ProductImages 
              imageUrl={product.imageUrl} 
              name={product.name} 
            />
            
            {/* Product Information Section */}
            <ProductInfo
              id={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              category={product.category}
              colors={product.colors}
              isNew={product.isNew}
              averageRating={averageRating}
              reviewCount={reviews.length}
              onAddToCart={handleAddToCart}
            />
          </div>
          
          {/* Reviews Section */}
          <ProductReviews 
            productId={id || ''}
            reviews={reviews}
            isAuthenticated={isAuthenticated}
            onReviewSubmit={fetchReviews}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleProduct;
