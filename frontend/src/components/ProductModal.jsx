import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>{product.name}</h2>
        <img src={product.imageURL} alt={product.name} />
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <p>Size: {product.size}</p>
        <p>Quantity: {product.quantity}</p>
        <p>GST: {product.isGST ? 'Yes' : 'No'}</p>
        <p>Manufacturing Date: {new Date(product.manufacturingDate).toLocaleDateString()}</p>
        <p>Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;