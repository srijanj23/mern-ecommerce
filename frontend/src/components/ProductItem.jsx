import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { deleteProduct, restoreProduct, getAllProducts } from '../features/products/productSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const cartItem = cartItems.find((item) => item.productId === product._id);
  const isInCart = !!cartItem;

  console.log(`Product: ${product.name}, ID: ${product._id}, Is In Cart: ${isInCart}, Cart Items:`, cartItems);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ _id: product._id, name: product.name, price: product.price }));
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (cartItem) {
      dispatch(removeFromCart(cartItem._id)); // Pass the cart entry's _id
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await dispatch(deleteProduct(product._id));
    dispatch(getAllProducts());
  };

  const handleRestore = async (e) => {
    e.stopPropagation();
    await dispatch(restoreProduct(product._id));
    dispatch(getAllProducts());
  };

  return (
    <div className='product-item'>
      <img src={product.imageURL} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Size: {product.size}</p>
      <p>Quantity: {product.quantity}</p>
      <p>GST: {product.isGST ? 'Yes' : 'No'}</p>
      {isInCart ? (
        <button onClick={handleRemoveFromCart}>Remove from Cart</button>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
      {product.isActive ? (
        <button onClick={handleDelete}>Delete</button>
      ) : (
        <button onClick={handleRestore}>Restore</button>
      )}
    </div>
  );
};

export default ProductItem;