💡#6.0 ~ #6.1 :: UseEffects <br>

✅ UseEffects : useState와는 달리 컴포넌트가 처음 렌더링될때만 실행되게 하는 기능

```javascript
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);  
  console.log("I run all the time");
  const iRunOnlyOnce = () => {
    console.log("I run only once")
  };
  useEffect(iRunOnlyOnce,[]);
  //첫번째 인자 : 한번만 실행할 함수, 두번째 인자 : 빈 배열
  
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
```

해당 코드로 useEffect를 실행해 준 결과, <br>
버튼을 클릭하여 useState와 useEffect 둘다 실행해주었는데,<br>
useState는 버튼 클릭과 동시에 실행되었고 useEffect는 한번 실행 후, 멈춘것을 확인할 수 있습니다.<br>
이게 바로 useEffect의 사용 이유와 핵심이라고 할 수 있겠습니다.
<br><br>

💡#6.2 :: UseEffects(2) <br>

```javascript
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);  
  console.log("I run all the time");
  const iRunOnlyOnce = () => {
    console.log("I run only once")
  };
  useEffect(iRunOnlyOnce,[]);
  useEffect(() => {
    console.log("SEARCH FOR", keyword);
  }, [keyword]); 
  //'keyword'가 변화할 때만 코드 실행하기! 
  
  return (
    <div>
      <input value={keyword} type="text" placeholder="Search Here.." onChange={onChange}></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}
``` 

useEffect의 바로 저 [] 자리에 keyword를 넣으면 'keyword' 가 변화할 때 !!! 코드를 실행할 거라고 react에게 알려주는 것입니다. <br>
만약 useEffect(iRunOnlyOnce,[]); 처럼 [] 안에 아무것도 넣어주지 않는다면 reacts는 지켜볼 게 없으므로 처음 한번만 코드를 실행하겠죠. <br>
하지만 [] 안에 값을 넣어줌으로써 원하는 시점에서 코드를 제어할 수 있습니다.

```javascript
 useEffect(() => {
    console.log("I run when keyword and counter change");
 },[keyword, counter])
```

[] 안에는 위처럼 2개 이상을 넣어줄 수도 있습니다 🧐


💡#6.4 :: Recap, Cleanup <br>
✅ Cleanup : 컴포넌트가 제거 (destroy) 되었을 때 이벤트를 실행시키는 함수

```javascript
import { useState, useEffect } from "react";

function Hello(){
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(prev => !prev);
  
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
```

button을 클릭함에 따라, Hello 컴포넌트가 render 되었다가, destroy 되었다가 하고 있습니다.

단순히 노출/비노출이 아니라, DOM 상에서 컴포넌트 자체가 생성되었다가 다시 제거되고 있죠.

이때 우리는 destroy 될 때에도 특정 코드를 실행할 수 있습니다.

```javascript
function Hello(){
  useEffect(() => {
    console.log("hi :)");
    return function(){
      console.log("bye :(")
    }
  },[])
  return <h1>Hello</h1>;
}
```

return을 통해서 컴포넌트가 제거될 때도 우리는 이벤트를 실행할 수 있습니다.

이렇게 useEffect라는 기능을 이용하여, 우리는 우리가 원하는 방식으로 컴포넌틀를 컨트롤 할 수 있게 되었습니다 😆
