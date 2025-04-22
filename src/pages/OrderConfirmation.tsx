
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="bg-green-100 rounded-full p-6 mb-6">
        <Check className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">
        Thank you for your order!
      </h1>
      <p className="text-muted-foreground text-lg text-center mb-8">
        Your order has been placed successfully.<br />
        You can view or track your order in the <span className="font-semibold">My Orders</span> section.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button className="w-full" onClick={() => navigate("/orders")}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          View Orders
        </Button>
        <Button variant="outline" className="w-full" onClick={() => navigate("/browse")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
