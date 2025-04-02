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
    console.log(toDos)
    //첨 세팅해준 setToDos는 빈 배열이었으므로 처음 currentArray는 [] 빈 배열!
    //그 다음 사용자가 input에 무언가를 적으면 currentArray엔 그 적어준게 들어갈 것이다
    
  }

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
         {toDos.map((item,index) => <li key={index}>{item}</li>)}
         {/* item은 배열 안에 각각의 요소들을 말함 */}
      </ul>
    </div>
  )
}

export default App;
