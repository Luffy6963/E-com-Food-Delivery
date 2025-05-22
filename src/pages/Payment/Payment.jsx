import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { deliveryFee } from "../Cart/Cart";
import "./Payment.css";

const Payment = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
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
    // Here you would typically process the payment
    // For demo, we'll just show an alert and redirect to home
    alert('Payment successful! Thank you for your order.');
    navigate('/');
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

            <button type="submit" className="pay-now-btn">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
