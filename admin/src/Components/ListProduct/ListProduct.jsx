import React, { useState, useEffect } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();
      setAllProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setAllProducts([]);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

const handleRemoveProduct = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await getAllProducts(); // Refresh products after successful deletion
    } else {
      console.error('Failed to delete product');
      alert('Error: Could not delete the product. Please try again.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('An unexpected error occurred. Please try again.');
  }
}


  return (
    <div className='list-product'>
      <h1>All Products</h1>
      <div className="list-product-format-main">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Offer Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all-products">
        {allProducts.map((product, index) => (
          <>
            <div key={index} className="list-product-format-main list-product-format-child">
              <div className="list-product-image-container">
                <img src={product.image} alt="product" className='list-product-image' />
              </div>
              <p>{product.name}</p>
              <p>{product.old_price}</p>
              <p>{product.new_price}</p>
              <p>{product.category}</p>
              <div className="list-product-remove-icon-container">
                <img onClick={() => handleRemoveProduct(product._id)} src={cross_icon} alt="remove" className='list-product-remove-icon' />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default ListProduct