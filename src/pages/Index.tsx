
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Smooth scrolling for better UX
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        
        {/* Categories Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-in">
              Shop By Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Running",
                  image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500",
                  description: "Performance shoes for speed and endurance",
                },
                {
                  title: "Lifestyle",
                  image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500",
                  description: "Casual comfort for everyday style",
                },
                {
                  title: "Training",
                  image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500",
                  description: "Versatile shoes for all your workouts",
                },
              ].map((category, index) => (
                <div 
                  key={index} 
                  className="relative rounded-xl overflow-hidden group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-center mb-4 text-white/90">{category.description}</p>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-all">
                      Shop Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Feature Benefits */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                Why Choose Shoevana
              </h2>
              <p className="text-muted-foreground text-balance animate-fade-in" style={{ animationDelay: "100ms" }}>
                Our commitment to quality, comfort, and style sets us apart. Experience the difference in every step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Materials",
                  description: "We source only the highest quality materials for durability and comfort.",
                  icon: "🌟",
                },
                {
                  title: "Ergonomic Design",
                  description: "Engineered for optimal comfort and support throughout the day.",
                  icon: "🦶",
                },
                {
                  title: "Sustainable Production",
                  description: "Eco-friendly practices and materials reduce our environmental impact.",
                  icon: "🌱",
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-90 z-0"></div>
          <div 
            className="absolute inset-0 z-0 opacity-30 bg-blend-overlay"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1520316587275-5e4f06f355e6?auto=format&fit=crop&w=1600)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                Join the Shoevana Community
              </h2>
              <p className="text-white/80 mb-8 text-balance animate-fade-in" style={{ animationDelay: "100ms" }}>
                Get exclusive access to limited edition releases, special offers, and early access to new collections.
              </p>
              <Button 
                size="lg" 
                className="rounded-full bg-white text-black hover:bg-gray-100 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
