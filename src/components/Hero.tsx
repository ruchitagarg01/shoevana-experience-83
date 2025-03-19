
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 dark:bg-gray-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-gray-100 dark:bg-gray-800 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 max-w-xl animate-slide-in">
            <div className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-black text-white">
              <span>New Collection 2024</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Step Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Innovation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md text-balance">
              Discover our latest collection of premium footwear designed for comfort, style, and unmatched performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full font-medium group">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Explore Lookbook
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Unique Designs</p>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">90%</p>
                <p className="text-sm text-muted-foreground">Sustainable Materials</p>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent rounded-full blur-3xl dark:from-transparent dark:via-yellow-900/10 dark:to-transparent opacity-70"></div>
            <div className="relative animate-float">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Featured Shoe"
                className="w-full h-auto object-contain rounded-xl hover-scale"
                style={{ transform: 'rotate(-10deg)' }}
              />
              <div className="absolute -right-6 top-6 bg-white dark:bg-gray-900 rounded-full shadow-lg p-4 animate-pulse-slow">
                <div className="text-center">
                  <span className="block text-xs uppercase tracking-wider">Only</span>
                  <span className="block text-xl font-bold">$199</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
