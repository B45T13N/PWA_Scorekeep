import {useState, useEffect} from 'react';
import axios from "axios";
import PaginationMeta from "../../interfaces/PaginationMeta";

export default function useApi() {
    const [error, setError] = useState(false);
    const [apiUrl, setApiUrl] = useState<string>();
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    useEffect(() => {
        const headers = {
            'Scorekeep-API-Key': process.env.REACT_APP_API_SCOREKEEP_KEY,
        };

        if (apiUrl != null) {
            axios.get(apiUrl, {headers})
                .then((response) => {
                    setMeta(response.data.meta as PaginationMeta);
                    setData(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                });
        }
    }, [apiUrl]);

    return { data, meta, error, callApi: setApiUrl };
}
