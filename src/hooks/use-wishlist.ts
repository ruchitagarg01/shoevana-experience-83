
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useWishlist = (productId: string) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user && productId) {
      checkWishlistStatus();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, productId]);

  const checkWishlistStatus = async () => {
    try {
      // Make sure productId exists before querying
      if (!productId) {
        setIsInWishlist(false);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user!.id)
        .eq('product_id', productId)
        .maybeSingle();

      if (error) {
        console.error('Wishlist check error:', error);
        setIsInWishlist(false);
      } else {
        setIsInWishlist(!!data);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      setIsInWishlist(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to manage your wishlist",
        variant: "destructive",
      });
      return;
    }

    // Ensure the productId is valid before continuing
    if (!productId || typeof productId !== 'string') {
      toast({
        title: "Error",
        description: "Invalid product ID",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      if (isInWishlist) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user!.id)
          .eq('product_id', productId);

        if (error) throw error;
        
        setIsInWishlist(false);
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist",
        });
      } else {
        // Add to wishlist
        // Make sure both IDs are strings
        const { error } = await supabase
          .from('wishlist')
          .insert([{ 
            user_id: String(user!.id), 
            product_id: String(productId) 
          }]);

        if (error) throw error;
        
        setIsInWishlist(true);
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist",
        });
      }
    } catch (error: any) {
      console.error('Wishlist operation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update wishlist",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInWishlist,
    isLoading,
    toggleWishlist
  };
};
