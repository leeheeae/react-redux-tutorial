# React Redux 사용해보기

**사용프로그램**
`react`, `redux`, `react-redux`, `redux-devtools-extension`, `redux-actions`

#### 리덕스 관련 코드 작성 방식

1. 액션 타입, 액션 생성 함수, 리듀서 코드를 구분하여 각 디렉토리에 작성하는 방식
   - 세 개의 디렉토리를 만들고 그 안에 기능별로 파일을 하나씩 만드는 방식
   - `actions`, `constants`, `reducers`
   - 코드를 종류에 따라 다른 파일에 작성하여 정리할 수 있어서 편리하지만, 새로운 액션을 만들 때마다 세 종류의 파일을 모두 수정해야하지 때문에 불편할 수 있음
   - 리덕스 공식 문서에서도 사용되는 가장 기본적인 방식
2. 기능별로 파일 하나에 몰아서 작성하는 방식
   - **Ducks 패턴**이라고 부름
   - 일반적인 구조로 리덕스를 사요하다가 불편함을 느낀 개발자들이 자주 사용하는 방식

#### 리덕스 코드 짜는 순서

1. 액션타입 정의하기
   - 액션 타입은 대문자로 정의
   - 문자열 내용은 `'모듈 이름/액션 이름'`과 같은 형태로 작성
   - 문자열 안에 모듈 이름을 넣음으로써, 나중에 프로젝트가 커졌을 때 액션의 이름이 충돌되지 않게 해줌
2. 액션 생성 함수 만들기
   - `export const 함수이름 = () => ({ type: 타입이름 });` 형식으로 작성
   - export를 사용함으로써 추후 이 함수를 다른 파일에서 불러와 사용 가능
3. 초기 상태 및 리듀서 함수 만들기
   - 모듈의 초기 상태 값 설정 (initialState)
   - 리듀서 함수에는 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드 작성
   - export default 키워드를 사용하여 함수를 내보내줌
     - export default는 단 한 개만 내보낼 수 있음
     - export는 여러개를 내보낼 수 있음
4. 루트 리듀서 만들기
   - 리덕스에서 제공하는 `combineReducers`라는 유틸 함수를 사용하면 쉽게 처리할 수 있음
   - modules 디렉토리에 index.js 파일을 만들고 그 안에 코드 작성

### 리액트 애플리케이션에 리덕스 적용하기

> 스토어를 만들고 리액트 애플리케이션에 리덕스를 적용하는 작업은 src 디렉토리의 index.js에서 이루어짐

#### 1. 스토어 만들기

```javascript
//src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import rootReducer from './modules';

const store = createStore(rootReducer);
```

#### 2. Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기

- App 컴포넌트를 react-redux에서 제공하는 Provider 컴포넌트로 감싸줌
- 이 컴포넌트를 사용할 때는 store를 props로 전달해 주어야함

#### 3. Redux DevTools의 설치 및 적용

- 크롬 확장 프로그램에서 Redux DevTools를 검색하여 설치
- `npm i redux-devtools-extension` 을 설치
- `composeWithDevTools()`를 import 한 후 store에 파라미터로 넘겨줌

### 컨테이너 컴포넌트 만들기

> 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부름
> 리덕스 스토어에 접근하여 원하는 상태를 받아오고, 또 액션도 디스패치해줄 예정

- src 디렉토리에 containers 디렉토리 생성, 그 안에 컴포넌트 파일 생성
- 리덕스와 연동하기 위해 `react-redux`에서 제공하는 `connect` 함수를 사용

  - `connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)`
  - *mapStateToProps*는 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
  - *mapDispatchToProps*는 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
  - connect 함수를 호출하고 나면 또 다른 함수를 반환, 반환된 함수에 컴포넌트를 파라미터로 넣어주면 리덕스와 연동된 컴포넌트가 만들어짐

  ```javascript
  const makeContainer = connect(mapStateToProps, mapDispatchToProps);
  makeContainer(타깃 컴포넌트)
  ```

  - `mapStateToProps`와 `mapDispatchToProps`에서 반환되는 객체 내부의 값들은 컴포넌트의 props로 전달
  - `mapStateToProps`는 state를 파라미터로 받아오며, 이 값은 현재 스토어가 지니고 있는 상태를 가리킴
  - `mapDispatchToProps`는 store의 내장 함수 dispatch를 파라미터로 받아옴
  - `mapStateToProps`와 `mapDispatchToProps`를 미리 선언해놓고 작성을 해도 되지만 connect 함수 내부에 익명 함수형태로 선언해도 문제가 되지 않음
  - 리덕스에서 제공하는 bindActionCreators 유틸 함수를 사용하면 좀 더 간편하게 작성 가능
  - mapDispatchToProps에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어주는 방식도 있음
    - 두 번째 파라미터를 객체 형태로 넣어주면 connect 함수가 내부적으로 bindActionCreators 작업을 대신 해줌

- Container 파일에 만들어둔 액션 객체를 불러온다.
- App.js에 컨테이너 컴포넌트를 불러온다.

## 리덕스 더 편하게 사용하기

### redux-actions

- `npm i redux-actions` 설치
- 리듀서를 작성할 때 switch/case 문이 아닌 handleActions 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식으로 작성

1. 액션생성함수 설정

   - `createAction` 함수 import
   - `export const increase = createAction(INCREASE);`형식으로 작성
   - 매번 객체를 직접 만들어줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언할 수 있음
   - 액션에 필요한 추가 데이터는 payload라는 이름을 사용
     - 변형을 주어서 넣고 싶다면, `createAction`의 두 번째 함수에 payload를 정의하는 함수를 따로 선언해서 넣어주면 됨
     - `const myAction = createAction(MY_ACTION, text=> `${text}!`)`

2. 리듀서 함수 설정
   - `handleActions` 함수 import
   - 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수 작성
     `[INCREASE]: (state, action) => ({ number: state.number + 1 })`
   - 두 번째 파라미터에는 초기 상태를 넣어줌
   - 파라미터로 받아온 값을 객체안에 넣을 때 원하는 이름으로 넣는 것이 아닌 `action.payload`라는 이름을 공통적으로 넣는 것

### redux Hooks를 사용하여 컨테이너 컴포넌트 만들기

#### useSelect

- connect함수를 사용하지 않고 useSelect를 이용하여 리덕스의 상태를 조회할 수 있음
- `const 결과 = useSelector(상태 선택 함수)`
- mapStateToProps와 형태가 똑같음
- useSelector로 값을 조회하고 해당 컴포넌트에게 프롭스로 넘겨줌

#### useDispatch

- 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해줌

```javascript
const dispatch = useDispatch();
dispatch({ type: 'SAMPLE_ACTION' });
```

- useCallback을 이용하여 성능을 최적화시킴

#### useStore

- 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있다.

```javascript
const store = useStore();
store.dispatch({ type: 'SAMPLE_ACTION' });
store.getState();
```

- 컴포넌트에서 정말 어쩌다가 스토어에 직접 접근해야 하는 상황에만 사용해야함
