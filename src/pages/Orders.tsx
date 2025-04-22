import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Package, PackageOpen, Info } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    total_amount: 2499,
    status: "Delivered",
    created_at: "2024-04-15T10:00:00Z",
    items: [
      { name: "Premium T-Shirt", quantity: 2, price: 1250 },
      { name: "Designer Jeans", quantity: 1, price: 1249 }
    ]
  },
  {
    id: "ORD-002",
    total_amount: 3999,
    status: "Processing",
    created_at: "2024-04-20T15:30:00Z",
    items: [
      { name: "Leather Jacket", quantity: 1, price: 3999 }
    ]
  }
];

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching orders:", error);
    else setOrders(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 space-y-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-semibold">₹{order.total_amount}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Placed on: {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              <Collapsible className="pt-4">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  <Info className="h-4 w-4" />
                  View Return & Exchange Policy
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 text-sm text-gray-600 bg-gray-50 p-4 mt-2 rounded-lg">
                  <h4 className="font-semibold mb-2">Return & Exchange Policy</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Returns are accepted within 30 days of delivery</li>
                    <li>Item must be unused and in original packaging</li>
                    <li>Free returns for size exchanges</li>
                    <li>Refunds will be processed within 5-7 business days</li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
