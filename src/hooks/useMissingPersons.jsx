import { useState, useEffect } from 'react';
import { fetchMissingPersons } from '../api/missingPerson';

export const useMissingPersons = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMissingPersons = async () => {
    try {
      setLoading(true);
      const data = await fetchMissingPersons();
      setPersons(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissingPersons();
  }, []);

  return { persons, loading, error, refresh: loadMissingPersons };
};
