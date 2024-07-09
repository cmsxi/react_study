import Board from './Board';

const test = <h1>안녕</h1>; // 정의 및 중괄호 표현 ~ js의 표현식 직접 사용할 수 있다

const Header = () => {
    let number = [1, 2, 3, 4, 5];
    // let board = number.map((v, i) => <Board />);

    return (
        <header>
            <h1>header</h1>
            {test}
            <ul>
                {number.map((v, i) => (
                    <Board key={i} number={i} />
                ))}
            </ul>
        </header>
    );
};
// 위와 같이 익명 함수를 활용해서 사용하는 경우가 훨씬 많음

export default Header; // default로 했기 때문에 import할 때 이름을 바꿀 수는 있음(그러나 그렇게 사용하는경우 거의 없다)
