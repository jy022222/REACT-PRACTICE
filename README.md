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
