import axios from 'axios';
import React, { useState } from 'react';

// 실제 DB를 수정하자 !!
// Create : POST
// Read   : GET
// Update : PUT
// Delete : DELETE
function Word({ word }) {
    const [wo, setWo] = useState(word);                 // 현재 단어 데이터 저장
    const [isShow, setIsShow] = useState(false);        // 뜻을 보이거나 숨기는 상태 저장
    const [isDone, setIsDone] = useState(word.isDone)   // 체크박스 상태 저장

    function toggleShow(params) {   // 뜻 보기/숨기기
        setIsShow(!isShow)
    }

    // 비동기 방식으로 전환 axios의 async/await로 Update(put) 사용
    // 서버로 put 요청을 보내 단어 상태(isDone) 업데이트, 성공 시 setIsDone으로 로컬 상태 변경
    async function toggleDone(params) {
        try {
            // ${word.id}는 word 객체의 고유 식별자로, API 요청과 조건부 렌더링에서 중요한 역할을 합니다.
            // 동일한 word 객체가 여러 개 있을 수 있으므로, id를 통해 단어를 식별합니다.
            const response = await axios.put(`http://localhost:3010/words/${word.id}`, {
                ...word,
                isDone: !isDone,
            });
            if (response.status == 200) { // 리소스 생성이 아닌 단순히 작업이 성공을 표시(GET,PUT,DELETE)
                setIsDone(!isDone);
            }
        } catch (error) {
            console.error("Error1 : ", error);
        }
    }

    // 비동기 방식으로 삭제 요청, 성공 시 id:0 으로 저장
    async function del(params) {
        if (window.confirm('정말 삭제할까요?')) {
            try {
                const response = await axios.delete(`http://localhost:3010/words/${word.id}`);
                if (response.status === 200) {
                    setWo({ id: 0 });
                }
            } catch (error) {
                console.error("Error2 : ", error);
            }
        }
    }
    // id가 0이면 아무런 렌더링하지 않는다.
    // 컴포넌트가 null 리턴하면 렌더링을 하지 않는다.
    // 삭제 후 UI에서 내용을 감추은 역할을 한다.
    if (wo.id === 0) {
        return null;
    }

    // isDone이 true면 off css를 통해 리스트 회색으로 처리, false면 아무동작 없음
    return (
        <tr className={isDone ? "off" : ""}>
            <td><input type='checkbox' checked={isDone} onChange={toggleDone} /> </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}> 뜻 {isShow ? '숨기기' : '보기'}</button>
                <button onClick={del} class="btn_del">삭제</button>
            </td>
        </tr>
    );
}

export default Word;