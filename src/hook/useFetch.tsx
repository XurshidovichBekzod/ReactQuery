import { useEffect, useState, useCallback } from "react";
import { apiCountry } from "../api/api";

interface IParams {
  limit?: number;
  skip?: number;
}

export const useFetch = <T,>(endpoint: string, params?: IParams) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    apiCountry
      .get(endpoint, { params })
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Error fetching data"))
      .finally(() => setLoading(false));
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
