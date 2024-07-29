import axios from 'axios';
import { useState } from 'react';

const Api1 = () => {
    const [data, setData] = useState([]); // state 초기화
    // API 호출 함수
    const callApi = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
            console.log(res.data);
            setData(res.data);
        }); // promise 객체로 return, then을 통해서 활용 가능
    };
    return (
        <>
            <button onClick={callApi}>API 호출</button>
            <div>
                {/* {JSON.stringify(data)} */}
                <ul>
                    {data.map((d) => (
                        <li key={d.id}>{d.title}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default Api1;
