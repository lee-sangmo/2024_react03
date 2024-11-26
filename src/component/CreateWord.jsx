import React, { useRef } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateWord(props) {
    const days = useFetch('http://localhost:3010/days');
    const history = useNavigate();

    // form 제출 처리
    async function onsubmit(e) {
        // 기본 기능을 막아줌 (새로고침)
        e.preventDefault();

        if (!dayRef.current.value || !engRef.current.value || !korRef.current.value) {
            alert("입력값이 비어있습니다");
            return;
        }

        // post는 CREATE
        await axios.post('http://localhost:3010/words/', {
            // useRef를 사용하여 입력 필드의 DOM 요소를 직접 참조합니다.
            // 사용자가 입력한 값을 가져옵니다
            day: dayRef.current.value,
            eng: engRef.current.value,
            kor: korRef.current.value,
            isDone: false
        }).then((res) => {
            if (res.status === 201) {           // 리소스 생성 성공 201 (POST)
                alert("생성 완료");
                history(`/day/${dayRef.current.value}`);    // post 요청 성공 시 현재 Day 페이지로 이동
            }
        }).catch((error) => {
            console.error("Error : ", error);
        });
    }
    
    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);
    return (
        <form onSubmit={onsubmit}>
            <div className='input_area'>
                <label htmlFor='engInput'>Eng</label>
                <input type='text' placeholder='computer' id='engInput' ref={engRef} />
            </div>
            <div className='input_area'>
                <label htmlFor='korInput'>Eng</label>
                <input type='text' placeholder='컴퓨터' id='korInput' ref={korRef} />
            </div>
            <div className='input_area'>
                <label>Day</label>
                <select ref={dayRef}>
                    {days && days.map(k => {                    // days가 존재하는 경우에만 랜더링, days 배열을 하나씩 불러냄
                        return <option key={k.id} value={k.day}>  {/* 고유 식별자 k.id, 그리고 Day번호로 사용자에게 표시되는 값과 <option>의 value로 사용되는 k.day */}
                            {k.day}
                        </option>
                    })}
                </select>
            </div>
            <button>저장</button>
        </form>
    );
}

export default CreateWord;