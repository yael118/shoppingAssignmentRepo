import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchProductsByCategory, selectCategory } from '../store/slices/categorySlice';
import { addToCart } from '../store/slices/cartSlice';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, products, selectedCategory, loading } = useSelector(state => state.categories);
  const cart = useSelector(state => state.cart);
  
  console.log('ShoppingList - Current cart state:', cart);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (categoryId) => {
    dispatch(selectCategory(categoryId));
    dispatch(fetchProductsByCategory(categoryId));
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    console.log('handleAddToCart called with:', { selectedProduct, quantity });
    if (selectedProduct && quantity > 0) {
      console.log('Dispatching addToCart action');
      dispatch(addToCart({ product: selectedProduct, quantity }));
      setSelectedProduct(null);
      setQuantity(1);
    } else {
      console.log('Invalid product or quantity');
    }
  };

  if (loading) return <div>טוען...</div>;

  return (
    <div className="shopping-list">
      <h1>רשימת קניות</h1>
      
      {/* Categories */}
      <div className="categories">
        <h2>קטגוריות</h2>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={selectedCategory === category.id ? 'selected' : ''}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products */}
      {selectedCategory && products[selectedCategory] && (
        <div className="products">
          <h2>מוצרים</h2>
          {products[selectedCategory].map(product => (
            <div key={product.id} className="product-item">
              <span>{product.name} - ₪{product.price}</span>
              <button onClick={() => handleProductSelect(product)}>
                בחר מוצר
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Product Selection */}
      {selectedProduct && (
        <div className="product-selection">
          <h3>נבחר: {selectedProduct.name}</h3>
          <div className="selection-inner-div">
            <label>כמות:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <button onClick={handleAddToCart}>הוסף מוצר לסל</button>
        </div>
      )}

      {/* Cart Summary */}
      <div className="cart-summary">
        <h2>עגלת הקניות</h2>
        {cart && cart.items ? cart.items.map(item => (
          <div key={item.id} className="cart-item">
            {item.name} - כמות: {item.quantity} - ₪{item.price * item.quantity}
          </div>
        )) : <div>הסל ריק</div>}
        <div className="total">סה"כ: ₪{cart ? cart.total : 0}</div>
        {cart && cart.items && cart.items.length > 0 && (
          <button onClick={() => navigate('/order-summary')}>
            המשך להזמנה
          </button>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;