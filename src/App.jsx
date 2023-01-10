import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from 'nanoid'

function App() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([].concat(storedTodos));
  localStorage.setItem("todos", JSON.stringify(todos));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodo("");
    setTodos([
      {
        id: nanoid(),
        todo: todo,
        done: false,
      },
      ...todos,
    ]);
  }


  function markDone(todo){
    const newTodos = todos.map((item)=>{
      if(item.id === todo.id){
        item.done = !item.done
      }
      return item
    })
    setTodos(newTodos);

  }


  function deleteTodo(todo){
    const newTodos = todos.filter((item)=>item.id !== todo.id)
    setTodos(newTodos)
  }

  return (
    <div>
      <h1>Hii</h1>
      <form action="">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addTodo(todo);
          }}
        >
          Add
        </button>
      </form>

      <div>
        <h3>
          Todos
        </h3>
        <ul>
          {todos.filter((todo) => todo.done === false).map((todo, index) => (
            <li key={index}>{todo.todo}
            <button onClick={()=>markDone(todo)}>Done</button>
            <button onClick={()=>deleteTodo(todo)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h3>
          Done
        </h3>
        <ul>
         {/* filter done */}

         {
            todos.filter((todo)=>todo.done).map((todo, index)=>(
              <li key={index}>{todo.todo}
                <button onClick={() => markDone(todo)}>Undone</button>
                <button onClick={() => deleteTodo(todo)}>Delete</button></li>
              
            ))

         }

        </ul>
        <ul>


        </ul>
      </div>
    </div>
  );
}

export default App;
