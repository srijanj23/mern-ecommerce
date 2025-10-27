import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/authSlice';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const { email, oldPassword, newPassword } = formData;

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // alert("Password reset successfully!")
    dispatch(resetPassword({ email, oldPassword, newPassword }));
  };

  return (
    <div className='form-container'>
      <h1>Reset Password</h1>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Old Password</label>
          <input
            type='password'
            name='oldPassword'
            value={oldPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>New Password</label>
          <input
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={onChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;