import { useState, useEffect } from 'react';

interface UseFetchDataResult<T> {
  data     : T | undefined;
  isLoading: boolean;
  error    : Error | null;
  refetch  : () => Promise<void>;
}

export const useFetchData = <T>(fetchFn: () => Promise<T>, initialData?: T): UseFetchDataResult<T> => {
  const [data, setData]           = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchFn();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ocurrió un Error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
};
