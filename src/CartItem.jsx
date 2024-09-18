import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CartItem.css';
import { removeItem, updateQuantity } from "./CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Handle incrementing the quantity of a plant
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of a plant, remove if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity is 0
    }
  };

  // Handle removing the plant from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate subtotal for a particular plant
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity; // Subtotal = cost * quantity
  };

  // Calculate total cost for all items in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + calculateTotalCost(item), 0);
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="continue-shopping-button" onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default CartItem;
