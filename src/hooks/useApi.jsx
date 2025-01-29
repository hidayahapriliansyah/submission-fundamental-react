import { useEffect, useState } from 'react';

function useApi(callback) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    callback()
      .then((result) => {
        const { data: resultData, error: err } = result;
        if (err) {
          setError(error);
        } else {
          setData(resultData);
        }
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, [callback]);

  return { data, error, isLoading };
}

export default useApi;
