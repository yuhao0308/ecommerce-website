import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_products_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/add-product' style={{textDecoration: 'none'}}>
        <div className='sidebar-item'>
          <img src={add_product_icon} alt="add-product" className='add-product-icon'/>
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/list-products' style={{textDecoration: 'none'}}>
        <div className='sidebar-item'>
          <img src={list_products_icon} alt="list-products" className='list-products-icon'/>
          <p>List Products</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar