import './Body.css';
import { useState, useRef } from 'react';

// 첫 글자가 대문자면 컴포넌트
function Viewer({ number }) {
    console.log('Viewer 랜더링');
    return Viewer;
    // return <div>{number % 2 === 0 ? <h3>짝수</h3> : <h3>홀수</h3>}</div>;
}

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

    const [text, setText] = useState(''); // setter함수 이름: setText
    const [date, setDate] = useState('');

    const handleChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
        setDate(e.target.value);
        // onChange이므로 텍스트 입력과 동시에 console에 출력, 랜더링
    };

    // const [name2, setName2] = useState('');
    // const [gender, setGender] = useState('');
    // const [birth, setBirth] = useState('');
    // const [bio, setBio] = useState('');

    // const onChangeName = (e) => {
    //     setName2(e.target.value);
    // };
    // const onChangeGender = (e) => {
    //     setGender(e.target.value);
    // };
    // const onChangeBirth = (e) => {
    //     setBirth(e.target.value);
    // };
    // const onChangeBio = (e) => {
    //     setBio(e.target.value);
    // };

    // 위처럼 각각 처리해도 되지만 아래와 같이 한번에 처리 가능함
    const [state, setState] = useState({
        name: '',
        gender: '',
        birth: '',
        bio: '',
    });

    const handleOnChange = (e) => {
        console.log('현재 수정 대상:' + e.target.name);
        console.log('수정값: ' + e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

        // // 전개 연산자를 사용하는 이유 : 아래와 같이 값을 변경하면, 주소값이 변경되지 않으므로 setter를 사용해도 랜더링이 일어나지 않음
        // // 리액트에서 값의 변화를 인지해야 랜더링이 새로 발생하기 때문
        // // 따라서 아래와 같이 객체를 재정의 하지 않고 전개 연산자를 사용해서 재정의를 하는 것임.
        // state[e.target.name] = e.target.value;
        // console.log(state);
        // setState(state);
    };

    const [number, setNumber] = useState(0);
    const onIncreaseFunc = () => {
        setNumber(number + 1);
    };
    const onDecreaseFunc = () => {
        setNumber(number - 1);
    };

    const [text2, setText2] = useState('');
    const textRef = useRef();
    const handleOnChange2 = (e) => {
        setText2(e.target.value);
    };

    const handleOnClick2 = (e) => {
        if (text2.length < 5) {
            textRef.current.focus();
        } else {
            alert(text2);
            textRef.current.value = '';
            // state를 바꾸는 것이 아니라 그냥 화면상으로 보이는 내용을 바꿔주므로, 다른 input요소에 변화가 생기면 랜더링이 다시 일어나 state를 다시 불러오는 현상 발생
        }
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
            <div>
                <input type="date" value={date} onChange={handleChange} />
                <div>{text}</div>
            </div>
            <hr />
            <div>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleOnChange}
                    placeholder="이름"
                />
            </div>
            <div>
                <select
                    value={state.gender}
                    name="gender"
                    onChange={handleOnChange}
                >
                    <option key={''}></option>
                    <option key={'남성'}>남성</option>
                    <option key={'여성'}>여성</option>
                </select>
            </div>
            <div>
                <input
                    type="date"
                    name="birth"
                    value={state.birth}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <textarea
                    value={state.bio}
                    name="bio"
                    onChange={handleOnChange}
                />
            </div>
            <hr />
            {/* 부모의 state가 바뀌면 그 state를 상속받은 자식의 state도 함께 바뀐다 */}
            {/* props와 상관없이 부모가 랜더링이 되면 자식도 함께 랜더링이 된다 */}
            <h2>{number}</h2>
            <Viewer number={number} />
            <div>
                <button onClick={onDecreaseFunc}>-</button>
                <button onClick={onIncreaseFunc}>+</button>
            </div>
            <hr />
            {/* ref사용하기 */}
            <div>
                <input value={text2} ref={textRef} onChange={handleOnChange2} />
                <button onClick={handleOnClick2}>작성 완료</button>
            </div>
        </div>
    );
};

// 전달된 객체 값이 없을 경우를 대비하여 해당 초기값 설정을 통해 에러 방지
Body.defaultProps = {
    favorList: [],
};

export default Body;
