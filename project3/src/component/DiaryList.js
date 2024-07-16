import Button from './Button';
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sortOptionList = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된 순' },
];

const DiaryList = ({ data }) => {
    const [sortType, setSortType] = useState('latest');
    const [sortedData, setSortedData] = useState([]);
    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === 'latest') {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(data));
        // js는 원본 배열을? sorting을 함. react가 값이 바뀌었는지 알 수 없음
        // 랜더링이 다시 일어나게 하려면 새로운 배열을 만들어 줘야함.
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };
    const navigate = useNavigate();
    const onClickNew = () => {
        navigate('/new');
    };
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button
                        type={'positive'}
                        text={'새 일기 쓰기'}
                        onClick={onClickNew}
                    />
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

export default DiaryList;
