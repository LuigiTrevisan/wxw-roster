import { useState, useEffect } from 'react';
import { getAllWrestlers, createWrestler, updateWrestler, deleteWrestler } from '../api/wrestlers';

export const useWrestlers = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchWrestlers = async () => {
    try {
      setLoading(true);
      const response = await getAllWrestlers();
      setWrestlers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch wrestlers. Please try again later.');
      setNotification({ type: 'destructive', message: 'Failed to fetch wrestlers.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createWrestler(formData);
      setNotification({ type: 'success', message: 'Wrestler created successfully!' });
      await fetchWrestlers();
      return true;
    } catch (err) {
      setNotification({ type: 'destructive', message: 'Failed to create wrestler.' });
      return false;
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updateWrestler(id, formData);
      setNotification({ type: 'success', message: 'Wrestler updated successfully!' });
      await fetchWrestlers();
      return true;
    } catch (err) {
      setNotification({ type: 'destructive', message: 'Failed to update wrestler.' });
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWrestler(id);
      setNotification({ type: 'success', message: 'Wrestler deleted successfully!' });
      await fetchWrestlers();
      return true;
    } catch (err) {
      setNotification({ type: 'destructive', message: 'Failed to delete wrestler.' });
      return false;
    }
  };

  useEffect(() => {
    fetchWrestlers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  return {
    wrestlers,
    loading,
    error,
    notification,
    handleCreate,
    handleUpdate,
    handleDelete
  };
};