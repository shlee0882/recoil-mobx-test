## Redux, Recoil, MobX

**Redux**, **Recoil**, **MobX**는 모두 상태 관리를 위한 도구이다.

- **Redux**: 대규모 애플리케이션의 **상태 관리**와 복잡한 상태 로직을 다루고자 할 때 사용된다. 미들웨어를 통한 비동기 작업 처리, 시간 여행 디버깅, 상태 변화의 예측 가능한 로직 등을 구현할 때 Redux가 유용하다.

<br/>

- **Recoil**: 리액트 애플리케이션에서 **상태 관리**를 간단하게 처리하고자 할 때나, 컴포넌트 간의 상태 공유를 쉽게 구현하고 싶을 때 사용된다. 페이스북에서 개발한 Recoil은 React와 밀접하게 통합되어 있어 React 애플리케이션과 함께 사용하기 용이하다.

<br/>


- **MobX**: 객체 지향적인 **상태 관리**를 선호하거나, 기존 클래스 기반 코드와 함께 사용하고자 할 때 유용하다. MobX는 자바스크립트 객체를 상태로 사용하며, 반응적인 프로그래밍 패러다임을 강조한다.

## Redux 
[Redux 알아보기](https://github.com/shlee0882/redux-study)
## Recoil

### Recoil 설치

```bash
$ npm install react recoil
```

Recoil은 페이스북에서 개발한 상태 관리 라이브러리로서, 리액트 애플리케이션의 복잡한 상태를 효율적으로 관리하기 위해 설계되었다. Recoil은 React의 Context API와 훅을 기반으로 구축되어 있으며, 상태의 중앙 집중화와 컴포넌트 간의 상태 공유를 더욱 편리하게 처리할 수 있도록 도와준다.

- **Atoms (원자)**: Atom은 **전역 상태의 단위를 정의**하는데 사용된다. 
atom 함수를 통해 정의되며, 상태의 초기값과 업데이트를 위한 setter 함수를 포함한다.

```js
import { atom } from 'recoil';
const textState = atom({
  key: 'textState', // unique ID 
  default: '', // default value 
});
```

- **Selectors (셀렉터)**: Selector는 하나 이상의 atom이나 다른 selector를 기반으로 **계산된 값을 제공**한다. 
복잡한 상태를 파생하거나 **가공**할 때 사용된다.

```js
import { selector } from 'recoil';
const charCountState = selector({
  key: 'charCountState', // unique ID 
  get: ({get}) => {
    const text = get(textState);
    return text.length;
  },
});
```


- **RecoilRoot**: RecoilRoot 컴포넌트는 리액트 애플리케이션의 최상위 컴포넌트로 감싸져야 한다. 
이를 통해 **Recoil 상태와 컴포넌트가 연결**된다.

```js
function App() {
  return (
    // RecoilRoot로 감싸짐.
    <RecoilRoot>
      <TodoList />
      <CharacterCounter />
    </RecoilRoot>
  );
}
export default App;
```


- **Hooks**: useRecoilState, useRecoilValue, useRecoilCallback 등의 훅을 사용하여 Recoil 상태를 읽고 업데이트할 수 있다.

```js
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';

// useRecoilState
function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

// useRecoilValue
function CharacterCount() {
  const count = useRecoilValue(charCountState);
  return <>Character Count: {count}</>;
}

// useRecoilCallback
const addTodo = useRecoilCallback(({ snapshot, set }) => async (text) => {
    const todoListSnapshot = snapshot.getLoadable(todoListState);
    if (todoListSnapshot.state === 'hasValue') {
      const updatedTodoList = [...todoListSnapshot.contents, { id: Date.now(), text }];
      await set(todoListState, updatedTodoList);
    }
});
```

- 상태 변경의 추적 및 최적화: Recoil은 상태 변경의 추적을 효율적으로 처리하며, 변경된 부분만 다시 렌더링하여 성능을 최적화한다.

<br/>

- 준비된 컴포넌트 별 업데이트: Recoil은 상태 변화에 따라 관련된 컴포넌트들만 업데이트하도록 처리하여 불필요한 리렌더링을 방지한다.

<br/>

- 상태 분할과 코드 분리: RecoilRoot를 사용하여 애플리케이션의 상태를 더 작은 단위로 나눌 수 있다. 이를 통해 상태와 컴포넌트가 분리되어 유지보수와 확장이 용이해진다.

### useRecoilState 이해하기

```js
import { useRecoilState } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID
  default: '', // default value
});

function MyComponent() {
  const [text, setText] = useRecoilState(textState);

  const handleChange = event => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>Text from Recoil: {text}</p>
    </div>
  );
}
```

- useRecoilState는 Recoil 라이브러리에서 제공하는 훅으로, Recoil 상태를 컴포넌트 내에서 사용하고 관리하는 데 사용된다. 
- textState는 Recoil atom이며, 전역적으로 공유되는 상태이다.
- useRecoilState는 상태값과 해당 상태를 업데이트하는 함수를 반환한다.

## MobX

### mobx 설치

```bash
$ npm install mobx mobx-react
```

MobX는 상태 관리 라이브러리로, 복잡한 상태와 UI 상태를 관리하기 위해 사용된다. 
MobX는 리액트와 다른 프레임워크 또는 라이브러리와 함께 사용할 수 있으며, 
단순한 API와 반응적인 프로그래밍 패러다임을 제공하여 상태 관리를 간편하게 만들어준다.

- Observables (관찰 대상): MobX의 핵심 개념 중 하나로, 상태를 관찰 대상으로 만들어준다. 
observable을 사용하여 객체, 배열, 맵 등의 데이터 구조를 관찰 대상으로 변환할 수 있다.

```js
import { observable } from 'mobx';

const todo = observable({
  id: 1,
  text: 'play game',
  completed: false,
});

console.log(todo.text); // 'play game'
```

- Reactions (반응): reaction, autorun, when과 같은 함수를 사용하여 상태의 변경을 감지하고 자동으로 반응할 수 있다. 
이를 통해 UI 업데이트 또는 부수 효과를 처리할 수 있다.

```js
import { observable, reaction } from 'mobx';

const todo = observable({
  id: 1,
  text: 'play game',
  completed: false,
});

const disposer = reaction(
  () => todo.completed,
  completed => {
    console.log(`Todo completed status changed: ${completed}`);
  }
);

// Somewhere later
todo.completed = true; // Reaction will be triggered
```

- Computed Values (계산된 값): computed 함수를 사용하여 다른 관찰 대상의 상태를 기반으로 계산되는 값을 생성할 수 있다. 
계산된 값은 캐시되어 중복 계산을 방지한다.

```js
import { observable, computed } from 'mobx';

const todo = observable({
  id: 1,
  text: 'Buy groceries',
  completed: false,
});

const todoInfo = computed(() => {
  return `Todo: ${todo.text}, Completed: ${todo.completed}`;
});

console.log(todoInfo.get()); // 'Todo: Buy groceries, Completed: false'
```

- Actions (액션): 상태를 변경하는 함수를 정의할 때 action 데코레이터를 사용하여 상태 변경을 추적할 수 있다. 
이를 통해 상태 변경의 추적과 디버깅을 쉽게 할 수 있다.

```js
import { observable, action } from 'mobx';

class TodoStore {
  @observable todos = [];

  @action
  addTodo(text) {
    this.todos.push({ id: Date.now(), text, completed: false });
  }

  @action
  toggleCompleted(todo) {
    todo.completed = !todo.completed;
  }
}

const store = new TodoStore();
store.addTodo('Buy groceries');
store.toggleCompleted(store.todos[0]);
console.log(store.todos[0].completed); // true
```

- 상태 분리와 코드 분리: MobX를 사용하면 상태를 특정 클래스 내에 캡슐화하고, 상태와 관련된 로직을 한 곳에 모아서 코드를 더욱 구조적으로 유지할 수 있다.

- 비동기 상태 관리: MobX는 비동기 코드와 함께 사용될 수 있으며, 비동기 상태 변경을 관리하기 위한 패턴도 제공한다.

- Devtools 및 미들웨어: MobX는 개발자 도구와 미들웨어를 통해 상태 변경 및 동작을 모니터링하고 로깅할 수 있는 기능을 제공한다.


MobX는 다른 상태 관리 라이브러리와는 조금 다른 프로그래밍 방식을 사용하며, 객체 지향적인 접근 방식을 강조한다. 
MobX는 React와 함께 사용할 수 있으며, React 컴포넌트 내에서 MobX 상태를 사용하고 업데이트할 수 있다. 
MobX를 사용하면 상태 관리를 더욱 간단하고 직관적으로 처리할 수 있다.


### MobX 이해하기

```js
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

export default Counter;
```