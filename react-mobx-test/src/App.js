import './App.css';
import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

// 상태를 관찰 대상으로 만든다
const counterState = observable({
  count: 0,
});

// 상태를 변경하는 함수를 정의한다
const counterActions = {
  increment: action(() => {
    counterState.count += 1;
  }),
};

// 컴포넌트
const Counter = observer(() => {
  return (
    <div>
      <h1>Counter: {counterState.count}</h1>
      <button onClick={counterActions.increment}>Increment</button>
    </div>
  );
});

function App() {
  return (
    <Counter></Counter>
  );
}

export default App;
