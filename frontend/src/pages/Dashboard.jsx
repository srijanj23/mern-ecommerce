import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <div className='dashboard-links'>
        <Link to='/add-product' className='btn btn-primary'>
          Add New Product
        </Link>
        <Link to='/product-list' className='btn btn-secondary'>
          View Products
        </Link>
        <Link to='/profile' className='btn btn-info'>
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;