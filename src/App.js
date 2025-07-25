//#7.1까지
// import { func } from "prop-types";
// import { useEffect, useState } from "react";
// import Movie from "./components/Movie";

// function App() {
//   const [toDo, setToDo] = useState("");
//   const [toDos, setToDos] = useState([]);
//   const onChange = (event) => setToDo(event.target.value);
//   const onSubmit = (event) => {
//     event.preventDefault();
//     if(toDo === "") {
//       return;
//     }
//     setToDo("");
//     //input value를 비워줌

//     setToDos(currentArray => [toDo, ...currentArray]);
//     console.log(toDos)
//     //첨 세팅해준 setToDos는 빈 배열이었으므로 처음 currentArray는 [] 빈 배열!
//     //그 다음 사용자가 input에 무언가를 적으면 currentArray엔 그 적어준게 들어갈 것이다
    
//   }

//   return (
//     <div>
//       <h1>My To Dos ({toDos.length})</h1>
//       <form onSubmit={onSubmit}> 
//         <input 
//           onChange={onChange} 
//           value={toDo} 
//           text="Text" 
//           placeholder="Write your do to.." />
//           <button>Add To Do</button>
//       </form>
//       <hr />
//       <ul>
//          {toDos.map((item,index) => <li key={index}>{item}</li>)}
//          {/* item은 배열 안에 각각의 요소들을 말함 */}
//       </ul>
//     </div>
//   )
// }



//#7.2 (Coin Tracker) 부터
// function App() {
//   const [loading, setLoading] = useState(true);
//   const [coins, setCoins] = useState([])
//   useEffect(() => {
//     fetch("https://api.coinpaprika.com/v1/tickers")
//       .then((response) => response.json())
//       .then((json) => {
//         setCoins(json);
//         setLoading(false);
//       });
//   }, [])
//   return ( 
//     <div>
//       <h1>The Coins! ({coins.length})</h1>
//       {loading ? <strong>Loading...</strong> : <ul>
//         {coins.map((coin) => <li>{coin.name} ({coin.symbol}) : {coin.quotes.USD.price}</li>)}
//       </ul>}
//     </div>
//   );
// }

// #7.3 Movie App 1-2 ~ #7.5 React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail"
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return <Router>
    <Switch>
      <Route path="/movie/:id">
          {/* /:id 이런식으로 넣어줌 */}
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
  // return <Router>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //   </Routes>
  // </Router>;
}
export default App;
