import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product._id));
  };

  if (isLoading) {
    return <h2>Loading product details...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className='product-details-container'>
      <img src={product.imageURL} alt={product.name} />
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Size: {product.size}</p>
      <p>Quantity: {product.quantity}</p>
      <p>GST: {product.isGST ? 'Yes' : 'No'}</p>
      <p>Manufacturing Date: {new Date(product.manufacturingDate).toLocaleDateString()}</p>
      <p>Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button style={{ marginLeft: '10px' }} onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default ProductDetails;