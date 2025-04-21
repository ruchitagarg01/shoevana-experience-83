import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <button className="text-blue-500" onClick={() => navigate("/browse")}>Shop now</button></p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border p-4 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold">
            <p>Total:</p>
            <p>₹{getTotalPrice().toFixed(2)}</p>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg" onClick={() => navigate("/payment")}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
