
import { useState, useEffect } from 'react';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SearchIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product, products } from '@/lib/products';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSearchResults([]);
      return;
    }

    if (searchQuery.length > 1) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, open]);

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    onOpenChange(false);
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
    onOpenChange(false);
  };

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl overflow-hidden">
        <Command className="rounded-lg border-none">
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              autoFocus
              placeholder="Search for products..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {searchQuery.length > 1 && (
            <>
              {isLoading ? (
                <div className="py-6 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : (
                <>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {searchResults.length > 0 && (
                    <CommandGroup heading="Products">
                      {searchResults.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => handleProductSelect(product.id)}
                          className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent"
                        >
                          <div className="h-10 w-10 rounded overflow-hidden bg-secondary flex-shrink-0">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-sm text-muted-foreground">{product.category}</span>
                          </div>
                          <div className="ml-auto font-medium">
                            ${product.salePrice || product.price}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {categories.length > 0 && (
                    <CommandGroup heading="Categories">
                      {categories
                        .filter((category) => 
                          category.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((category) => (
                          <CommandItem
                            key={category}
                            onSelect={() => handleCategorySelect(category)}
                            className="px-4 py-2 cursor-pointer hover:bg-accent"
                          >
                            {category}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </>
          )}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
