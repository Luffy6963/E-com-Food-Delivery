import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { deliveryFee } from "../Cart/Cart";
import "./Payment.css";

const Payment = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  // Add this with your other state variables
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  // Show loading state
  setIsLoading(true);
  
  // Prepare payment data
  const paymentData = {
  amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : deliveryFee),
  api_key: 'a58b6fd37b4290da74118b81ccd9157148fa34b9e0773cc8765fab9d4fbfaf2d',
  order_id: `order_${Date.now()}`, // Unique order ID
  customer_name: 'John Doe', // Replace with actual customer name
  customer_email: 'demo@meet.com', // Replace with actual customer email
  customer_mobile: '1234567890', // Replace with actual customer mobile
  success_url: '/success', // URL to redirect on success
  error_url: '/error', // URL to redirect on error
};

  // Send payment request to your backend
  fetch('http://localhost:8080/api/secure/process/initiate-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'a58b6fd37b4290da74118b81ccd9157148fa34b9e0773cc8765fab9d4fbfaf2d'
    },
    body: JSON.stringify(paymentData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Payment processing failed');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful response
      if (data.payment_url) {
        // For redirect-based payment flows (like UPI)
        window.location.href = data.payment_url;
      } else if (data.success) {
        // For COD or successful direct payments
        alert('Payment successful!');
        navigate('/order-confirmation', { state: { orderId: data.orderId } });
      }
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  return (
    <div className="payment-container">
      <button className="go-back" onClick={() => navigate(-1)}>
        ⬅️ Back to Delivery Info
      </button>

      <div className="payment-wrapper">
        <div className="payment-details">
          <h2>Payment Method</h2>
          <form onSubmit={handleSubmit}>
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'credit-card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                />
                <span>Credit/Debit Card</span>
              </label>

              <label className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <span>UPI</span>
              </label>

              <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {paymentMethod === 'credit-card' && (
              <div className="card-details">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="card-info">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="upi-details">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
                <p className="upi-note">Complete payment using your preferred UPI app</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="cod-details">
                <p>Pay in cash when your order is delivered.</p>
                <p>Please keep exact change handy.</p>
              </div>
            )}

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{getTotalCartAmount()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>₹{getTotalCartAmount() === 0 ? 0 : deliveryFee}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryFee}</span>
              </div>
            </div>

            <button type="submit" className="pay-now-btn" disabled={isLoading}>
  {isLoading ? 'Processing...' : 'Pay Now'}
</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
