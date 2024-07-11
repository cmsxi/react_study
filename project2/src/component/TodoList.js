import TodoItem from './TodoItem';
import './TodoList.css';
import { useState, useMemo } from 'react';

export default ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === ''
            ? todo
            : todo.filter((it) =>
                  it.content.toLowerCase().includes(search.toLowerCase()),
              );
    };
    const analyzeTodo = useMemo(() => {
        console.log('aaaaa호출');
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            // 중괄호 : 객체로 리턴
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);

    const { totalCount, doneCount, notDoneCount } = analyzeTodo; // useMemo를 통해 나온 결과값이므로 함수가 아님

    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <div>
                {/* useMemo 없이 함수를 작성하면 todo에 저장한 아이템 개수에 비례해서 연산량이 증가하므로 item이 많아진다면 성능 문제가 생길 수도 있음 */}
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                className="searchbar"
                placeholder="검색어를 입력하세요"
            />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem
                        key={it.id}
                        {...it}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};
