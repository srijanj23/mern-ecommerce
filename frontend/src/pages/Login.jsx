import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className='form-container'>
      <h1>Login</h1>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p>
        <Link to='/forgot-password'>Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;