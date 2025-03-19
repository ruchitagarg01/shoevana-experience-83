
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Newsletter Section */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground mb-2">
                Get updates on new releases, exclusive offers, and more.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 rounded-full"
                />
                <Button className="rounded-full">Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold mb-6">SHOEVANA</h2>
            <p className="text-muted-foreground mb-6 text-balance">
              Premium footwear crafted with attention to detail, comfort, and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-6">Shopping</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Men's Collection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Women's Collection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sale</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Lookbook</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Fashion Street, Design District,<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="mailto:hello@shoevana.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  hello@shoevana.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground order-2 md:order-1 mt-4 md:mt-0">
              &copy; {new Date().getFullYear()} Shoevana. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 order-1 md:order-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Returns Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
