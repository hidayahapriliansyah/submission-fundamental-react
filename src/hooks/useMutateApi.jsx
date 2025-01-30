import { useState } from 'react';

function useMutateApi(callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: resultData, error: err } = await callback(payload);
      if (err) {
        setError(err);
      } else {
        setData(resultData);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate, data, error, isLoading,
  };
}

export default useMutateApi;
