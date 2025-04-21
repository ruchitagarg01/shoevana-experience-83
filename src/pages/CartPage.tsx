import { useCart } from "@/contexts/CartContext"; // ✅ Ensure correct path
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart(); // ✅ Get cart functions
  const totalPrice = getTotalPrice(); // ✅ Get total price
  const navigate = useNavigate(); // ✅ Navigation hook

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/browse" className="text-blue-500">
            Shop now
          </Link>.
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border p-4 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
              <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
          ))}

          {/* ✅ Total Price */}
          <div className="flex justify-between mt-4 font-bold">
  <p>Total:</p>
  <p>₹{isNaN(getTotalPrice()) ? "0.00" : getTotalPrice().toFixed(2)}</p> {/* ✅ Prevents NaN */}
</div>


          {/* ✅ Checkout Button - Navigates to checkout */}
          <Button
            className={`w-full mt-4 ${cartItems.length > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={cartItems.length === 0}
            onClick={() => navigate("/checkout")} // ✅ Redirects to Checkout page
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
