import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import axios from 'axios';

const OrderSummary = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  console.log('OrderSummary - Current cart state:', cart);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        items: cart.items,
        total: cart.total,
        orderDate: new Date().toISOString()
      };

      console.log('Sending order data:', orderData);

      const response = await axios.post('http://localhost:3001/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Order submitted successfully:', response.data);
      setSubmitSuccess(true);
      dispatch(clearCart());
    } catch (error) {
      console.error('Error submitting order:', error);
      console.error('Error details:', error.response?.data);
      console.error('Status:', error.response?.status);
      alert(`שגיאה בשליחת ההזמנה: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="success-message">
        <h2>ההזמנה נשלחה בהצלחה!</h2>
        <button onClick={() => navigate('/')}>
          חזור לקניות
        </button>
      </div>
    );
  }

  return (
    <div className="order-summary">
      <h1>סיכום הזמנה</h1>
      
      {/* Order Items */}
      <div className="order-items">
        <h2>המוצרים שנבחרו</h2>
        {cart && cart.items && cart.items.length > 0 ? (
          cart.items.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name}</span>
              <span>כמות: {item.quantity}</span>
              <span>מחיר: ₪{item.price * item.quantity}</span>
            </div>
          ))
        ) : (
          <div>אין מוצרים בעגלה</div>
        )}
        <div className="order-total">סה"כ: ₪{cart ? cart.total : 0}</div>
      </div>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} className="customer-form">
        <h2>פרטי לקוח</h2>
        
        <div className="form-group">
          <label>שם פרטי *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>שם משפחה *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>כתובת מלאה *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>מייל *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'שולח...' : 'אשר הזמנה'}
        </button>
      </form>
    </div>
  );
};

export default OrderSummary;