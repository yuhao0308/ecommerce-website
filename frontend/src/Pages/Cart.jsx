import React, { useContext } from 'react';
import CartItems from '../Components/CartItems/CartItems'; // Import the cart items component
import {ShopContext} from '../Context/ShopContext';

const Cart = () => {
  // const { getCartTotal } = useContext(ShopContext); // Access the total calculation function

  return (
    <div className="cart">
      <CartItems />
    </div>
  );
};

export default Cart;
