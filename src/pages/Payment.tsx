
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayNow = () => {
    // Show payment success alert (optional)
    // alert("Payment Successful!");

    // Navigate to Order Confirmation page instead
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <p>Select your payment method:</p>
      <button
        className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg"
        onClick={handlePayNow}
      >
        Pay Now
      </button>
      <button
        className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default PaymentPage;
