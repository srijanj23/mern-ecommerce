import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Welcome to the MERN E-commerce App</h1>
      <p>Your one-stop shop for all your needs!</p>
      <div className='home-buttons'>
        <Link to='/product-list' className='btn btn-primary'>
          Shop Now
        </Link>
        <Link to='/register' className='btn btn-secondary'>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;