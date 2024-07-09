export default (props) => {
    return (
        <>
            {/* key를 넣으면 react가 나중에 컴포넌트로 데이터를 비교할 때(가상Dom과 현재 랜더링된 DOM) 순번이 있으면 조금 더 빠르게 교체 시켜줌 */}
            <li key={props.number}>제목</li>
        </>
    );
};
