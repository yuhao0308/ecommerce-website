import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product, cartItems, removeFromCart} = useContext(ShopContext)
  return (
    <div className="cart-items">
      <div className="cart-items-format-main cart-items-grid">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id] > 0)
        {
          return <div>
                    <div className="cart-items-format cart-items-grid">
                      <img src={e.image} alt="" className='cart-icon-product-icon'/>
                      <p>{e.name}</p>
                      <p>${e.new_price}</p>
                      <button className='cart-items-quantity'>{cartItems[e.id]}</button>
                      <p>{e.new_price * cartItems[e.id]}</p>
                      <img className='cart-items-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                  </div>
        }
        return null;
      })}
    </div>
  )
}

export default CartItems