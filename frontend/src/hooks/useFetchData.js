import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In Docker, localhost:5000 might need adjustment if accessed server-side, 
                // but for client-side React, localhost:5000 works if ports are mapped.
                // Ideally use an environment variable.
                // In production (Nginx), we use relative path (empty base) because endpoint already has /api
                // In dev, we might use absolute.
                const baseUrl = import.meta.env.VITE_API_URL || '';
                const response = await axios.get(`${baseUrl}${endpoint}`);
                setData(response.data);
            } catch (err) {
                console.error("API Error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetchData;
