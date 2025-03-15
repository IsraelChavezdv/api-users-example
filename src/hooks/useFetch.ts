import { useState, useEffect } from "react";
import axios from "axios";

type ResponseData<T> = T | null;
type ErrorType = Error | null;

interface FetchResponse<T> {
  data: ResponseData<T>;
  loading: boolean;
  error: ErrorType;
}
export const useFetch = <T>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<ResponseData<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err); // Asegurarse de que err es una instancia de Error
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
