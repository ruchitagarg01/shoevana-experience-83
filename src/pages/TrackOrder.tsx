
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface Order {
  id: string;
  status: string;
  created_at: string;
}

const TrackOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [trackingId, setTrackingId] = useState<string>("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error("Error in fetchOrders:", err);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    // In a real app, this would search the database
    // For now, we'll just check against our local orders
    const found = orders.find(order => order.id === trackingId);
    
    if (!found && trackingId) {
      // For demo purposes, create a mock order if not found
      setSearchedOrder({
        id: trackingId,
        status: ["Processing", "Shipped", "Out for delivery", "Delivered"][
          Math.floor(Math.random() * 4)
        ],
        created_at: new Date().toISOString()
      });
    } else {
      setSearchedOrder(found || null);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing": return 1;
      case "shipped": return 2;
      case "out for delivery": return 3;
      case "delivered": return 4;
      default: return 1;
    }
  };

  const renderStatusTimeline = (status: string) => {
    const step = getStatusStep(status);
    
    return (
      <div className="mt-8">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all" 
              style={{ width: `${Math.max(0, (step - 1) * 33)}%` }}
            ></div>
          </div>
          
          {/* Status Points */}
          <div className="flex justify-between relative">
            <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <Package className="h-4 w-4" />
              </div>
              <span className="text-xs">Processing</span>
            </div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <Package className="h-4 w-4" />
              </div>
              <span className="text-xs">Shipped</span>
            </div>
            
            <div className={`flex flex-col items-center ${step >= 3 ? "text-blue-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <Truck className="h-4 w-4" />
              </div>
              <span className="text-xs">Out for delivery</span>
            </div>
            
            <div className={`flex flex-col items-center ${step >= 4 ? "text-blue-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-xs">Delivered</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-medium mb-4">Enter Your Order ID</h2>
            <div className="flex space-x-2">
              <Input 
                type="text" 
                placeholder="e.g., ORD-001" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="max-w-md"
              />
              <Button onClick={handleSearch}>Track</Button>
            </div>
            
            {searchedOrder && (
              <div className="mt-6 p-6 border rounded-lg animate-fade-in">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{searchedOrder.id}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on: {new Date(searchedOrder.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    searchedOrder.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {searchedOrder.status}
                  </span>
                </div>
                
                {renderStatusTimeline(searchedOrder.status)}
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="shipping-policy">
                    <AccordionTrigger>Shipping & Delivery Policy</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p>Standard shipping: 5-7 business days</p>
                        <p>Express shipping: 2-3 business days</p>
                        <p>Orders are processed within 24 hours on business days</p>
                        <p>Delivery times may vary based on location and availability</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
          
          {user && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">Your Recent Orders</h2>
              {loading ? (
                <p>Loading your orders...</p>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            Placed on: {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTrackingId(order.id);
                            setSearchedOrder(order);
                          }}
                        >
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You haven't placed any orders yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
