import { useState, useEffect } from 'react';

function useQueryApi(callback, initialParams = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async (params) => {
    setIsLoading(true);
    setError(false);

    try {
      const result = await callback(params);
      const { data: resultData, error: err } = result;
      setData(resultData);
      setError(err);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialParams);
  }, [callback, initialParams]);

  const query = async (params) => {
    await fetchData(params);
  };

  return {
    data,
    error,
    isLoading,
    query,
  };
}

export default useQueryApi;
