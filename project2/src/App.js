import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import TestComp from './component/TestComp';

// import { useState, useRef } from 'react';
import { useReducer, useRef, useCallback } from 'react';

const mockTodo = [
    {
        id: 0,
        isDone: false,
        content: 'React 공부하기',
        createDate: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: '빨래 널기',
        createDate: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: '노래 연습하기',
        createDate: new Date().getTime(),
    },
];
// useCallback 성능 개선 확인하는 법: mockTodo for문으로 5000개 정도 데이터 만들어서 확인해보기 => delay 체감된다고 함.

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE': {
            return [action.newItem, ...state];
        }
        case 'UPDATE': {
            return state.map((it) =>
                it.id === action.targetId
                    ? {
                          ...it,
                          isDone: !it.isDone,
                      }
                    : it,
            );
        }
        case 'DELETE': {
            return state.filter((it) => it.id !== action.targetId);
        }
        default:
            return state;
    }
}

function App() {
    // const [todo, setTodo] = useState(mockTodo);
    const [todo, dispatch] = useReducer(reducer, mockTodo);
    const idRef = useRef(3);
    // const onCreate = (content) => {
    //     const newItem = {
    //         id: idRef.current,
    //         content,
    //         idDone: false,
    //         createDate: new Date().getTime(),
    //     };
    //     setTodo([newItem, ...todo]);
    //     idRef.current += 1;
    // };

    // const onUpdate = (targetId) => {
    //     setTodo(
    //         todo.map((it) =>
    //             it.id === targetId ? { ...it, isDone: !it.isDone } : it,
    //         ),
    //     );
    // };

    // const onDelete = (targetId) => {
    //     setTodo(todo.filter((it) => it.id !== targetId));
    // };

    const onCreate = (content) => {
        dispatch({
            type: 'CREATE',
            newItem: {
                id: idRef.current,
                content,
                idDone: false,
                createDate: new Date().getTime(),
            },
        });
        idRef.current += 1;
    };

    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: 'UPDATE',
            targetId,
        });
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({
            type: 'DELETE',
            targetId,
        });
    }, []);

    return (
        <div className="App">
            <TestComp />
            <Header />
            <TodoEditor onCreate={onCreate} />
            <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    );
}

export default App;
