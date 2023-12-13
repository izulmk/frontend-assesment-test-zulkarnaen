// useFetch.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface PlanetData {
  results: any[]; // Adjust according to the expected API response structure
}

const useFetch = (url: string) => {
  const [data, setData] = useState<PlanetData>({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null); // Change error type to any/unknown

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData((prevData) => ({
        results: [...prevData.results, ...res.data.results], // Append new data to existing data
      }));
    } catch (err: any) {
      setError(err.message || err); // Set error message from API response
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
};

export default useFetch;
