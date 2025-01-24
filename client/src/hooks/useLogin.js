import { useState } from 'react';
import { login } from '../api/login';
import { useNavigate } from 'react-router-dom';

export const useLogin = (username, password) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ username, password });
      localStorage.setItem('token', response.data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
        setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleLogin
  };
};