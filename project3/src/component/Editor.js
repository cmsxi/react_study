import './Editor.css';
import { useEffect, useState, useCallback } from 'react';
import { getFormattedDate, emotionList } from '../util';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const handleOnGoBack = () => {
        navigate(-1);
    };

    // state는 해당 컴포넌트 내에서만 쓰이는 지역변수와 같은 느낌의 변수
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: '',
    });
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };
    const handleSubmit = () => {
        onSubmit(state);
    };
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    return (
        <>
            <div className="Editor">
                <div className="editor_section">
                    <h4>오늘의 날짜</h4>
                    <div className="input_wrapper">
                        <input
                            type="date"
                            value={state.date}
                            // state로 안바꾸면 리엑트에서 화면으로 확인 못함. value로 바꿔야함.
                            onChange={handleChangeDate}
                        />
                    </div>
                </div>
                <div className="editor_section">
                    <h4>오늘의 감정</h4>
                    <div className="input_wrapper emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.id}
                                {...it}
                                onClick={handleChangeEmotion}
                                isSelected={state.emotionId === it.id}
                            />
                        ))}
                    </div>
                </div>
                <div className="editor_section">
                    <h4>오늘의 일기</h4>
                    <div className="input_wrapper">
                        <textarea
                            placeholder="오늘은 어땠나요?"
                            value={state.content}
                            onChange={handleChangeContent}
                        />
                    </div>
                </div>
                <div className="editor_section bottom_section">
                    {/* <Button text={'취소하기'} onClick={handleOnGoBack} /> */}
                    <Button text={'취소하기'} onClick={() => navigate(-1)} />
                    {/* 안에 그냥 함수를 실행하는 것이 아니라 () => 와 같이 정의해줘야함 */}
                    <Button
                        text={'작성완료'}
                        type={'positive'}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
};
export default Editor;
