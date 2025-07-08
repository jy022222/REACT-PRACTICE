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


💡#7.0 :: To Do List (1) <br>
✅ 투두리스트 만들기 1
```javascript
import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo === "") {
      return;
    }
    setToDo("");
    //input value를 비워줌

    setToDos(currentArray => [toDo, ...currentArray]);
    //첨 세팅해준 setToDos는 빈 배열이었으므로 처음 currentArray는 [] 빈 배열!
    //그 다음 사용자가 input에 무언가를 적으면 currentArray엔 그 적어준게 들어갈 것이다
  }

  return (
    <div>
      <form onSubmit={onSubmit}> 
        <input 
          onChange={onChange} 
          value={toDo} 
          text="Text" 
          placeholder="Write your do to.." />
          <button>Add To Do</button>
      </form>
    </div>
  )
}
```
사용자가 input 란에 할 일을 적어주면, 그 일들 즉 리스트들을 배열로 받아와야 합니다.

그러기 위해서 setToDos라는 배열의 모습을 가진 useState를 만들어 주었는데요,

input에 입력된 값을 계속 누적하여 배열 안에 쌓기 위해 ...currentArray 를 이용해 두번째 인자로 넣어주었습니다.

🩵 할 일 갯수 카운팅 해보기

```javascript
return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      //{}안에 갯수를 넣어주었음
      <form onSubmit={onSubmit}> 
        <input 
          onChange={onChange} 
          value={toDo} 
          text="Text" 
          placeholder="Write your do to.." />
          <button>Add To Do</button>
      </form>
    </div>
  )
  ```
  리액트는 즉각적으로 toDos의 개수를 가져와 h1 태그 안에 반영해 줄 수 있습니다.


💡#7.1 :: To Do List (2) <br>
✅ 투두리스트 만들기 2

🩵 map() 함수를 사용하여 ul태그 안에 넣기

```javascript
return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}> 
        <input 
          onChange={onChange} 
          value={toDo} 
          text="Text" 
          placeholder="Write your do to.." />
          <button>Add To Do</button>
      </form>
      <hr />
      <ul>
         {toDos.map((item) => <li>{item}</li>)}
      </ul>
    </div>
  )
  ```
toDos 배열을 받아와서 각각의 배열 안에 있는 item들을 li 안으로 뿌려주는 코드입니다.

input 에 입력을 완성할 때마다 li가 생성되고, 그 안에 잘 들어가 있는것을 볼 수 있습니다.

같은 컴포넌트의 리스트를 렌더링 할 때에는 key 라는 prop을 넣어줘야 합니다.


```javascript
 <ul>
 {toDos.map((item,index) => <li key={index}>{item}</li>)}
	//key는 고유의 값이어야 함
</ul>
```

map 함수는 두번째 인자로 1,2,3, ... 과 같은 index 를 받아올 수 있으므로,

key 값에 index값을 넣어주면 될 것 같습니다!

이렇게하면 콘솔에 오류도 사라지고 정상적인 코드가 됩니다. 😃


💡#7.2 :: Coin Tracker 만들기 <br>
🩵 fetch 함수로 코인 api 연동하기

```javascript
  function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
    }, [])
    return (
      <div>
        <h1>The Coins!</h1>
        {loading ? <strong>Loading...</strong> : null }
      </div>
    );
  }
```
이렇게 하면 우리는 웹에서 Response로 api상에 있는 코인들을 받아올 수 있고,
이 Response로 부터 json 추출이 가능하다!

```javascript
  function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers").then(response => response.json().then(json => console.log(json)))
                                                      //then 메소드를 활용하여 response를 받아옴
    }, [])
    return (
      <div>
        <h1>The Coins!</h1>
        {loading ? <strong>Loading...</strong> : null }
      </div>
    );
  }
```
array들로 코인들을 받았다면, map함수를 이용해서 UI를 업데이트 할 수 있습니다.

```javascript
  function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([])
    //json데이터(즉 coin)를 state에 넣기 위해 만들어줌
    
    useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);
          setLoading(false);
          //우리가 json 즉, coin 데이터를 받았을 때, setCoins 를 실행시킨다.
          //coins 얻기를 끝냈다면, loading을 false로 바꿔준다.
        });
    }, [])
    return (
      <div>
        <h1>The Coins! ({coins.length})</h1>
        //coins.length를 이용해 몇개가 출력됐는지 확인 가능
        {loading ? <strong>Loading...</strong> : null}
        <ul>
          {coins.map((coin) => 
            <li>{coin.name} ({coin.symbol}) : {coin.quotes.USD.price}</li>)
          }
        </ul>
      </div>
    );
  }
```



💡#7.3 :: Movie Part 1 <br>
✅ 영화 앱 만들기
✷ API url : https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year

(평점9점 이상의 영화들을 연도순으로 정렬하겠다는 파라미터 추가)

해당 API url 주소 복사해두고~

```javascript
  import { func } from "prop-types";
  import { useEffect, useState } from "react";

  function App() {
      const [loading, setLoading] = useState(true);
      useEffect(() => {
          fetch(
              `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
          ).then((response) => response.json()).then(json => console.log(json))
      }, [])
      return <div>
          {loading ? <h3>Loading...</h3> : null}
      </div>;
  }

  export default App;
```
코인 트래커와 마찬가지로 API url을 fetch해준 후 response로부터 json을 추출해 줍니다.

```javascript
function App() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovies] = useState([]);
    //movie라는 useState를 하나 만들어준다
    useEffect(() => {
        fetch(
            `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
        ).then((response) => response.json())
        .then(json => {
            setMovies(json.data.movies);
            //useState의 빈 배열 안에 원하는 object 담기
        });
    						
    }, [])
    return <div>
        {loading ? <h3>Loading...</h3> : null}
    </div>;
}
```
data.movie로 영화 리스트들을 쭉 받아온 후 setMovies() 아래에

setLoading(false);

로딩이 된 후 화면에 "Loading..." 메세지를 지울 수 있다!

💡 async-await : 비동기 코드를 동기 코드처럼 순서대로 작성할 수 있게 해주는 도구 (기존의 then 메소드를 대신함)

```javascript
  function App() {
      const [loading, setLoading] = useState(true);
      const [movies, setMovies] = useState([]);
      const getMovies = async() => {
      //비동기 함수 선언. async를 붙이면 내부에서 await 사용 가능
          const json = await (await fetch(
          //API응답이 올 때까지 await로 기다림
              `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
          )).json();
          //그 응답에서 .json()을 또 기다림 >> json에 결과 object가 저장됨
          setMovies(json.data.movies);
          setLoading(false);
      }
      useEffect(() => {
          getMovies()
      }, [])
      return <div>
          {loading ? <h3>Loading...</h3> : null}
      </div>;
  }
```

🩵 이제 UI에 영화 리스트들을 노출해보자! 어떻게 ?? map 메소드 이용!!

```javascript
  function App() {
      const [loading, setLoading] = useState(true);
      const [movies, setMovies] = useState([]);
      const getMovies = async() => {
          const json = await (await fetch(
              `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
          )).json();
          setMovies(json.data.movies);
          setLoading(false);
      }
      useEffect(() => {
          getMovies()
      }, [])
      return <div>
          {loading ? <h3>Loading...</h3> : <div>
              {movies.map((movie => (
              <div key={movie.id}>
              //key값으로 API에서 고유의 id값을 가져옴
                <img src={movie.medium_cover_image} />
                  <h2>{movie.title}</h2>
                  <p>{movie.summary}</p>
                  //title(제목)과 summary(요약)등등을 가져온다
                  <ul>
                      {movie.genres.map(g => <li key={g}>{g}</li>)}
                  </ul>
                  //API에서 genres도 배열이기 때문에 또 map으로 가져옴
              </div>
              )))}
          </div>}
      </div>;
  }
```

이렇게 하면 여러 영화들을 리스트형태로 UI에 노출시킬 수 있음 🥳
