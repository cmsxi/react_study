import './App.css';
import Header from './component/Header.js'; // App.js가 위치한 곳을 기준으로 상대경로
import Body from './component/Body.js';
import Footer from './component/Footer.js';
function ChildComp() {
    return <div>child component</div>;
}
function App() {
    // const name = '홍길동';
    // const age = 30;
    const BodyProps = {
        name: '홍길동',
        age: 20,
        favorList: ['파스타', '빵', '떡볶이'],
    };

    return (
        <>
            <div className="App">
                <Header />
                {/* <Body name={name} age={age}/> */}
                <Body {...BodyProps}>
                    <ChildComp />
                </Body>
                {/* 전개 연산자(..., 배열 또는 객체를 하나하나 넘기는 경우에 활용하는 연산자)없으면 에러남 */}
                <Footer />
            </div>
            <div></div>
        </>
    );
}

export default App;
