import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart } from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, isLoading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  if (isLoading) {
    return <h2>Loading cart...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className='cart-container'>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className='cart-items'>
            {cartItems.map((item) => (
              <div key={item._id} className='cart-item'>
                <div>
                  <h3>{item.name}</h3>


                  <p>Price: ${item.price}</p>
                  <button onClick={() => handleRemoveFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='cart-summary'>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className='btn btn-primary'>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;