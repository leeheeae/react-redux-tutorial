import { createAction, handleAction } from 'redux-actions';

//액션타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//초기상태
const initialState = {
  number: 0,
};

//리듀서 함수
const counter = handleAction(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
