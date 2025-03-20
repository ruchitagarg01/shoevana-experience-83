
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  const handleQuantityIncrease = (itemId: string, name: string, price: number, currentQuantity: number) => {
    addToCart({
      id: itemId,
      name,
      price,
      quantity: 1
    });
  };
  
  const handleQuantityDecrease = (itemId: string, name: string, price: number, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      removeFromCart(itemId);
      return;
    }
    
    // Remove the current item and add it back with one less quantity
    removeFromCart(itemId);
    addToCart({
      id: itemId,
      name,
      price,
      quantity: currentQuantity - 1
    });
  };
  
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };
  
  const totalPrice = getTotalPrice();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-16 w-16 mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/browse')}>Continue Shopping</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </button>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 space-y-6">
                {cartItems.map((item) => {
                  const formattedPrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(item.price);
                  
                  return (
                    <div key={item.id} className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                      <div className="w-full sm:w-24 h-24 bg-secondary rounded-md mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                        {/* Placeholder for product image */}
                        <div className="w-full h-full rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                          <ShoppingBag className="h-8 w-8" />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-medium">{formattedPrice}</p>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleQuantityDecrease(item.id, item.name, item.price, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-l-md"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-600">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => handleQuantityIncrease(item.id, item.name, item.price, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-r-md"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
