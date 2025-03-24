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

💡#6.3 :: UseEffects(2) <br>

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
