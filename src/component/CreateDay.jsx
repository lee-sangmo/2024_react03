import React from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateDay(props) {
    const days = useFetch('http://localhost:3010/days')
    const history = useNavigate();

    async function addDay(params) {
        try {
            const response = await axios.post(`http://localhost:3010/days`, {
                day: (Array.isArray(days) ? days.length : 0) + 1
            });
            if (response.status === 201) {    // 리소스 생성 성공201 (POST)
                alert("생성 완료");
                history('/')
            }
        } catch (error) {
            console.error("error발생 : ", error);
        }
    }
    return (
        <div>
            <h3>현재일수 : {days && days.length}일</h3>
            <button onClick={addDay}>Day추가</button>
        </div>
    );
}

export default CreateDay;