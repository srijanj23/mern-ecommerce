import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfile } from '../features/auth/authSlice';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
      });
    }
  }, [user]);

  const { name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <div className='form-container'>
      <h1>Edit Profile</h1>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Email (Disabled)</label>
          <input type='email' value={user?.email || ''} disabled />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update Profile
        </button>
        <Link to="/reset-password" style={{ marginLeft: '10px' }} className="btn btn-secondary">
          Reset Password
        </Link>
      </form>
    </div>
  );
};

export default ProfileEdit;