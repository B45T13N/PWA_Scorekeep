import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApi() {
    const [error, setError] = useState(false);
    const [apiUrl, setApiUrl] = useState<string>();
    const [data, setData] = useState([]);

    useEffect(() => {
        const headers = {
            'Scorekeep-API-Key': process.env.REACT_APP_API_SCOREKEEP_KEY,
        };

        if (apiUrl != null) {
            axios.get(apiUrl, {headers}) // Use Axios for GET request
                .then((response) => {
                    setData(response.data.data); // Use response.data to get the data
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                });
        }
    }, [apiUrl]);

    return { data, error, callApi: setApiUrl };
}
