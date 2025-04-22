
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ReviewFormData } from '@/types/review';

interface ReviewFormProps {
  productId: string;
  onSubmitSuccess: () => void;
}

const ReviewForm = ({ productId, onSubmitSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast({
        title: "Login required",
        description: "Please login to submit a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            product_id: productId,
            user_id: user.id,
            rating,
            comment: reviewText.trim() || null
          }
        ]);

      if (error) throw error;

      setRating(0);
      setReviewText('');
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      onSubmitSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoverRating ? star <= hoverRating : star <= rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="review" className="block text-sm font-medium mb-2">Review (optional)</label>
        <Textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this product..."
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" disabled={isSubmitting || rating === 0}>
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
