
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewList from '@/components/Reviews/ReviewList';
import ReviewForm from '@/components/Reviews/ReviewForm';
import type { Review } from '@/types/review';

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  isAuthenticated: boolean;
  onReviewSubmit: () => void;
}

const ProductReviews = ({
  productId,
  reviews,
  isAuthenticated,
  onReviewSubmit
}: ProductReviewsProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      {isAuthenticated ? (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <ReviewForm 
            productId={productId} 
            onSubmitSuccess={onReviewSubmit} 
          />
        </div>
      ) : (
        <p className="mb-8 text-muted-foreground">
          Please <button onClick={() => navigate('/login')} className="text-primary hover:underline">login</button> to write a review.
        </p>
      )}
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ProductReviews;
