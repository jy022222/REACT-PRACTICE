import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);  
  console.log("I run all the time");

  useEffect(() => {
    if(keyword !== "" && keyword.length > 5) {
      console.log("SEARCH FOR", keyword)
    }
  }, [keyword]); 
  //'keyword'가 변화할 때만 코드 실행하기! 

  useEffect(() => {
    console.log("I run when keyword and counter change");
  },[keyword, counter])
  //여러개 넣어줄 수도 있음
  
  return (
    <div>
      <input value={keyword} type="text" placeholder="Search Here.." onChange={onChange}></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
