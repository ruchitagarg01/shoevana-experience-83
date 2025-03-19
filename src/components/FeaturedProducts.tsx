
import { useState } from 'react';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(featuredProducts.map(p => p.category))];
  
  const filteredProducts = activeCategory === 'All' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory);

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Featured Products</h2>
            <p className="text-muted-foreground text-balance">
              Discover our curated selection of premium footwear designed for style and comfort.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button variant="link" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeCategory === category
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
