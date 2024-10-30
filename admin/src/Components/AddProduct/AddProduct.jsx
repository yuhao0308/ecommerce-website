import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: 'women',
    image: ''
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleProductDetails = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value});
  }

  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('image', image);

    await fetch(`http://localhost:4000/images`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      responseData = data;
    })

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch(`http://localhost:4000/products`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(data => {
        data.success ? alert('Product Added Successfully') : alert('Product Adding Failed');
      })
    }
  }

  return (
    <div className='add-product'>
      <div className="add-product-item-field">
        <p>Product Name</p>
        <input value={productDetails.name} onChange={handleProductDetails} name='name' type="text" placeholder='Enter product name'/>
      </div>
      <div className="add-product-price">
        <div className="add-product-item-field">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={handleProductDetails} name='old_price' type="number" placeholder='Enter price' />
        </div>
        <div className="add-product-item-field">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={handleProductDetails} name='new_price' type="number" placeholder='Enter offer price' />
        </div>
      </div>
      <div className="add-product-item-field">
        <p>Category</p>
        <select value={productDetails.category} onChange={handleProductDetails} name="category" id="category" className='add-product-selector'>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <p>Product Image</p>
        <label htmlFor="file-upload">
          <img src={image? URL.createObjectURL(image):upload_area} alt="upload area" className='add-product-thumbnail-img'/>
        </label>
        <input onChange={handleImage} type="file" name="file-upload" id="file-upload" className='add-product-thumbnail-input' hidden/>
      </div>
      <button onClick={addProduct} className='add-product-button'>Add</button>
    </div>
  )
}

export default AddProduct