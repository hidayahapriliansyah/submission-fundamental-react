import { useEffect, useState } from 'react';

function useApi(callback, params = null) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    callback(params)
      .then((result) => {
        const { data: resultData, error: err } = result;
        setError(err);
        setData(resultData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [callback]);

  return { data, error, isLoading };
}

export default useApi;
