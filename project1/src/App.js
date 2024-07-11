import "./App.css";
import Controller from "./component/Controller";
import Viewer from "./component/Viewer";
import Even from "./component/Even";
import { useState, useEffect, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleOnChanageText = (e) => {
    setText(e.target.value);
  };

  const handleSetCount = (value) => {
    setCount(count + value);
  };

  const didMountRef = useRef(false);
  // useEffect(함수, 의존성배열);
  // 배열안에 들어간 변수가 바뀌면 앞의 함수가 실행
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    } else {
      console.log("컴포넌트 업데이트");
    }
  });

  useEffect(() => {
    console.log("컴포넌트 마운트");
  }, []); // 빈 의존성 배열 : 의존성의 값을 안주겠다. ==> 맨 처음 한번만 실행

  // useEffect(() => {
  //   // useEffect의 콜백 함수가 setInterval 함수 실행
  //   // setInterval의 콜백함수가 1초에 한번 콘솔을 찍는 함수 실행
  //   // 다른 이벤트 일어나면 함수가 중첩돼서 동시에 스레드처럼 여러번 출력됨 => 빠르게 출력 여러번 되는 것 처럼 보임
  //   const intervalID = setInterval(() => {
  //     console.log("깜빡");
  //   }, 1000);
  //   return () => {
  //     console.log("클린업");
  //     clearInterval(intervalID);
  //   };
  // });

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input value={text} onChange={handleOnChanageText} />
      </section>
      <section>
        <Viewer count={count} />
        {/* Even은 그냥 컴포넌트. 아래와 같이 하면 왼쪽 조건이 충족될 때 오른쪽 컴포넌트가 실행됨 */}
        {/* And 연산은 왼쪽 조건이 false일 때 오른쪽을 실행하지 않는다는 특성을 활용 */}
        {count % 2 === 0 && <Even />}
      </section>
      <section>
        <Controller handleSetCount={handleSetCount} />
      </section>
    </div>
  );
}

export default App;
