import './App.css';
// import { getEmotionImgById } from './util';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import React, { useReducer, useRef, useEffect, useState } from 'react';

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            return [action.data, ...state];
        }
        case 'UPDATE': {
            // map: 데이터를 돌며 mapping시킴,
            // 10개의 일기가 있다면 10번을 도는 것.
            return state.map((it) =>
                String(it.id) === String(action.data.id)
                    ? { ...action.data }
                    : it,
            );
        }
        // api 사용하면 targetID를 API로 전송만 해주면 됨
        case 'DELETE': {
            return state.filter(
                (it) => String(it.id) !== String(action.targetId),
            );
        }
        default: {
            return state;
        }
    }
}

const mockData = [
    {
        id: 'mock1',
        date: new Date().getTime(),
        content: 'mock1',
        emotionId: 1,
    },
    {
        id: 'mock2',
        date: new Date().getTime(),
        content: 'mock2',
        emotionId: 2,
    },
    {
        id: 'mock3',
        date: new Date().getTime(),
        content: 'mock3',
        emotionId: 3,
    },
];

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    // 데이터를 모두 업데이트하기 전에 자식 컴포넌트에서 일기 state값을 사용하면 초기화 되지 않은 데이터에 접근하므로 문제 발생할 수 있음
    // = 데이터 초기 로딩이 끝나지 않았는데 특정페이지에서 데이터를 요청하면 문제가 발생할 수 있다는 뜻
    // isDataLoaded 변수로 데이터 로딩 여부를 알려줌
    const idRef = useRef(0); // 실제 db연동할때는 db에 key가 있으므로 생성 안해줘도 됨
    useEffect(() => {
        dispatch({
            type: 'INIT',
            data: mockData,
        });
        setIsDataLoaded(true);
    }, []);

    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
        idRef.current += 1;
    };
    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
    };
    const onDelete = (targetId) => {
        dispatch({
            type: 'DELETE',
            targetId,
        });
    };

    if (!isDataLoaded) {
        return <div>데이터를 불러오는 중입니다.</div>;
    } else {
        return (
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider
                    value={{ onCreate, onUpdate, onDelete }}
                >
                    <div className="App">
                        <Routes>
                            {/* diary 뒤 :id 경로가 동적으로 바뀐다는 뜻 */}
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/diary/:id" element={<Diary />} />
                            <Route path="/edit/:id" element={<Edit />} />
                        </Routes>
                        <div>
                            {/* Link를 개발자 도구에서 보면 a태그로 보임. 그러나 link의 경우 리액트가 이벤트를 걸어 경로를 이동하고, 
                    a태그의 경우 클릭하면 주소창에 링크를 걸고 이동한 것과 같은 효과
                    리액트를 안쓰는 것과 같음 
                    <Link to={'/'}>Home</Link>
                    <Link to={'/new'}>new</Link>
                    <Link to={'/diary'}>diary</Link>
                    <Link to={'/edit'}>edit</Link> */}
                            {/* 정적 페이지로 최적화하기 :
                            대규모 서버는 데이터를 그때그때 가져오는 것이 아니라 데이터를 페이지에 미리 저장해두어 바로 불러오는 방식을 사용하기도 함
                    완벽한 실시간이 필요하지 않다면 해당 방식이 더 효율적일 수 있음  */}
                        </div>
                    </div>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        );
    }
}

export default App;
