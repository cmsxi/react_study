import './Body.css';
import { useState } from 'react';

const Body = ({ name, age, favorList, children }) => {
    console.log('body랜더링');
    // const { name, age } = props;
    const numA = 1;
    const numB = 2;
    const objA = {
        a: 1,
        b: 2,
    };

    // console.log(props);
    // const color = { backgroundColor: 'red', color: 'blue' };
    const handleOnClick = (e) => {
        console.log(e); // 이벤트 객체가 통째로 출력 SyntheticBaseEven...
        console.log(e.target); // 객체가 출력
        console.log(e.target.name); // 객체의 name 속성 출력
        console.log(e.target.dataset.id); //data-id --> 이거 원래 undefined나오는거?
    };

    const [count, setCount] = useState(0); // count에는 초깃값 0이 들어감. setCount에는 값을 바꿔주는 setter 함수를 넣어줌. -> 구조분해할당이 일어나서 대입이 됨
    // - useState(0)를 훅이라고 부름. 일단은 함수라고 생각하기
    const onIncrease = () => {
        // count += 1;
        // console.log(count);
        // 리액트가 count가 바뀐것을 인지를 해야만 body안의 내용이 변경이 됨. 그러나 +만 해서는 바로 랜더링이 일어나지는 않음
        // console에는 올바른 값이 출력됨
        // 따라서 setter함수로 변경해서 사용. (Setter함수에 의해 랜더링이 일어남.)
        setCount(count + 1);
    };
    return (
        <div className="body">
            <h1>body</h1>
            <h2>
                {numA + numB} {objA.a}
            </h2>
            {/* <h3>{props.name}</h3> */}
            {/* <h3>{props.age}</h3> */}
            <h3>
                {name} {age}: {favorList.length}개의 음식을 좋아합니다.
            </h3>
            {children} {/* 이름이 정해져 있음 */}
            <button onClick={handleOnClick} name="A버튼">
                A버튼
            </button>
            <button onClick={handleOnClick} name="B버튼">
                B버튼
            </button>
            <h2>{count}</h2>
            {/*count는 자바로 치자면 지역변수임. 해당 컴포넌트 안에서만 사용되기 때문  */}
            {/* js는 함수도 하나의 타입임. 따라서 변수자리에 함수가 들어갈 수 있음 */}
            <button onClick={onIncrease}>+</button>
        </div>
    );
};

// 전달된 객체 값이 없을 경우를 대비하여 해당 초기값 설정을 통해 에러 방지
Body.defaultProps = {
    favorList: [],
};

export default Body;
