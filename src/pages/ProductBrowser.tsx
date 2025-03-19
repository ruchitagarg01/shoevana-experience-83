
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { products, getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  Grid3X3, 
  Rows3, 
  ChevronDown,
  Search,
  X
} from 'lucide-react';

const ProductBrowser = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category ? [category] : []
  );

  // Get unique categories and colors from products
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allColors = Array.from(
    new Set(products.flatMap(p => p.colors))
  ).sort();

  // Filter and sort products based on current selections
  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedCategories.includes(p.category.toLowerCase())
      );
    } else if (category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => {
      const price = p.salePrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => 
          selectedColors.includes(color.toLowerCase())
        )
      );
    }

    // Sort products
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      default: // featured
        filtered.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
    }

    setDisplayedProducts(filtered);
  }, [category, sortOption, priceRange, searchQuery, selectedColors, selectedCategories]);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 300]);
    setSelectedColors([]);
    setSelectedCategories([]);
  };

  const pageTitle = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Shoes` 
    : 'All Products';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 mt-4">
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
            <p className="text-muted-foreground mt-2">
              {displayedProducts.length} products
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            <div className="flex items-center gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <div className={`
              w-full md:w-64 md:flex-shrink-0 space-y-6
              ${isFilterOpen ? 'block' : 'hidden md:block'}
            `}>
              <div className="flex items-center justify-between md:hidden">
                <h3 className="font-semibold">Filters</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <div className="relative">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <div key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${cat}`}
                        checked={selectedCategories.includes(cat.toLowerCase())}
                        onChange={() => toggleCategory(cat.toLowerCase())}
                        className="mr-2"
                      />
                      <label htmlFor={`cat-${cat}`}>{cat}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 300]}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      title={color}
                      onClick={() => toggleColor(color.toLowerCase())}
                      className={`
                        w-6 h-6 rounded-full border border-gray-200
                        ${selectedColors.includes(color.toLowerCase()) ? 'ring-2 ring-black dark:ring-white ring-offset-2' : ''}
                      `}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
                      }}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Desktop Sort and View Controls */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                  >
                    <Rows3 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedColors.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 300) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCategories.map(cat => (
                    <div key={cat} className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {cat}
                      <button onClick={() => toggleCategory(cat)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedColors.map(color => (
                    <div key={color} className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: color }}
                      ></div>
                      {color}
                      <button onClick={() => toggleColor(color)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {searchQuery && (
                    <div className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      Search: {searchQuery}
                      <button onClick={() => setSearchQuery('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 300) && (
                    <div className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      ${priceRange[0]} - ${priceRange[1]}
                      <button onClick={() => setPriceRange([0, 300])}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Products Grid or List */}
              {displayedProducts.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
                }>
                  {displayedProducts.map(product => (
                    <div key={product.id} className={viewMode === 'list' ? 'animate-fade-in bg-white dark:bg-gray-900 rounded-xl p-4 flex gap-4' : ''}>
                      {viewMode === 'list' ? (
                        <>
                          <div className="w-24 h-24 flex-shrink-0">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <div className="mt-2 mb-4">
                              {product.salePrice ? (
                                <div className="flex gap-2 items-center">
                                  <span className="text-red-500 font-medium">${product.salePrice}</span>
                                  <span className="text-muted-foreground line-through text-sm">${product.price}</span>
                                </div>
                              ) : (
                                <span className="font-medium">${product.price}</span>
                              )}
                            </div>
                            <Button size="sm">Add to Cart</Button>
                          </div>
                        </>
                      ) : (
                        <ProductCard product={product} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductBrowser;
