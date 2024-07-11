import { useEffect } from "react";

// 바로 export할 수 있음
export default () => {
  useEffect(() => {
    return () => {
      console.log("Even 컴포넌트 언마운트");
    };
  }, []);
  return <div>현재 카운트는 짝수입니다.</div>;
};
