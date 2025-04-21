
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

export interface ReviewFormData {
  rating: number;
  review_text: string;
}
