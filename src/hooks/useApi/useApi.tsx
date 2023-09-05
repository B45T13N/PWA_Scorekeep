import {useState, useEffect, useRef} from 'react';
import axios from "axios";

export default function useApi() {
    const firstUpdate = useRef(true);
    const [error, setError] = useState(false);
    const [apiUrl, setApiUrl] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const headers = {
            'Scorekeep-API-Key': process.env.REACT_APP_API_SCOREKEEP_KEY,
        };

        if (!firstUpdate.current) {
            axios.get(apiUrl, {headers}) // Use Axios for GET request
                .then((response) => {
                    setData(response.data); // Use response.data to get the data
                })
                .catch((error) => {
                    setError(true);
                });
        }
        firstUpdate.current = false;
    }, [apiUrl]);
    return { data, error, callApi: setApiUrl };
}
