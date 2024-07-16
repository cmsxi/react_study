import { useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Button from '../component/Button';
import Header from '../component/Header';
import Viewer from '../component/Viewer';
import { getFormattedDate } from '../util';

const Diary = () => {
    const { id } = useParams();
    const data = useDiary(id);
    // console.log(data);
    // 처음에는 undefined였다가 데이터를 업데이트함
    // undefined일때 데이터 배열에 접근하면 오류가 발생함

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        const { date, emotionId, content } = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        return (
            <div>
                <Header
                    title={title}
                    leftChild={<Button text={'< 뒤로 가기'} onClick={goBack} />}
                    rightChild={<Button text={'수정하기'} onClick={goEdit} />}
                />
                <Viewer content={content} emotionId={emotionId} />
            </div>
        );
    }
};
export default Diary;
