
-- This SQL script defines the wishlist table structure
-- Run this in your Supabase SQL editor if your table structure is incorrect

-- Create wishlist table with proper UUID constraints
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  product_id TEXT NOT NULL, -- Changed to TEXT to handle string IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure each product is only added once per user
  CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);

-- Add appropriate indexes
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON public.wishlist (user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON public.wishlist (product_id);

-- Set RLS policies (Row Level Security)
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to see their own wishlist items
CREATE POLICY "Users can view their own wishlist"
  ON public.wishlist
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own wishlist items
CREATE POLICY "Users can add to their own wishlist"
  ON public.wishlist
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own wishlist items
CREATE POLICY "Users can remove from their own wishlist"
  ON public.wishlist
  FOR DELETE
  USING (auth.uid() = user_id);
