import { useParams } from "react-router-dom";
import Word from "./Word";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

function Day(props) {
    // 리액트에서 라우터 사용 시 파라미터 정보를 가져와 활용 할 수 있다
    const day = useParams().day;        // days의 day 파라미터를 가져와서 day로 저장
    const words = useFetch(`http://localhost:3010/words?day=${day}`);       // words의 day 정보를 words로 저장
    return (
        <table>
            <tbody>
                {words.map(k => {                               // 앞서 저장된 words에 해당하는 내용을 하나씩 돌려본다(id, day, eng...)
                    return <Word key={k.id} word={k} />         // Word 컴포넌트의 id와 word=k 값을 반환
                })}
            </tbody>
        </table>
    );
}

export default Day;