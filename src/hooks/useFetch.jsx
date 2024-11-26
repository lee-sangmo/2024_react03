import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useFetch(url) {
    const [data, setData] = useState([])

    // response.json()메서드를 호출하면 JSON 데이터를 javascript 객체로 변환한다.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                
            }
        };

        fetchData();
},[url]);
return data;
}
export default useFetch;