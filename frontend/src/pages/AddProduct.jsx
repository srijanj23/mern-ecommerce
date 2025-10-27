import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    size: '',
    category: 'Beauty',
    quantity: 0,
    isGST: false,
    imageURL: 'https://tinyurl.com/yc8p57dk',
    manufacturingDate: '',
    expiryDate: '',
  });

  const dispatch = useDispatch();

  const { name, price, size, category, quantity, isGST, imageURL, manufacturingDate, expiryDate } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    setFormData({
      name: '',
      price: 0,
      size: '',
      category: 'Beauty',
      quantity: 0,
      isGST: false,
      imageURL: '',
      manufacturingDate: '',
      expiryDate: '',
    });
  };

  return (
    <div className='form-container'>
      <h1>Add Product</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Price</label>
          <input type='number' name='price' value={price} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Size</label>
          <input type='text' name='size' value={size} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Category</label>
          <select name='category' value={category} onChange={onChange}>
            <option value='Beauty'>Beauty</option>
            <option value='Electronics'>Electronics</option>
            <option value='Furniture'>Furniture</option>
            <option value='Fashion'>Fashion</option>
            <option value='Food'>Food</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Quantity</label>
          <input type='number' name='quantity' value={quantity} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>
            <input type='checkbox' name='isGST' checked={isGST} onChange={onChange} />
            GST Applicable
          </label>
        </div>
        <div className='form-group'>
          <label>Image URL</label>
          <input type='text' name='imageURL' value={imageURL} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label>Manufacturing Date</label>
          <input type='date' name='manufacturingDate' value={manufacturingDate} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Expiry Date</label>
          <input type='date' name='expiryDate' value={expiryDate} onChange={onChange} required />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;