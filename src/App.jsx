import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
 
  if (storedTodos === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([].concat(storedTodos || []));

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

  function markDone(todo) {
    const newTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.done = !item.done;
      }
      return item;
    });
    setTodos(newTodos);
  }

  function deleteTodo(todo) {
    const newTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(newTodos);
  }

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form>
        <input
          type="text"
          value={todo}
          placeholder="Add a new task"
          onChange={(e) => setTodo(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addTodo(todo);
          }}
        >
          Add Task
        </button>
      </form>

      <div>
        <h3>Pending Tasks</h3>
        {todos.filter((todo) => todo.done === false).length ? (
          <ul>
            {todos
              .filter((todo) => todo.done === false)
              .map((todo, index) => (
                <li key={index} className="todo-item">
                  <span className={todo.done ? "done" : ""}>{todo.todo}</span>
                  <div className="todo-btns">
                    <button onClick={() => markDone(todo)}>Mark as Done</button>
                    <button onClick={() => deleteTodo(todo)}>Delete</button>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p>You have no pending tasks. Why not add one?</p>
        )}
      </div>

      <div>
        <h3>Completed Tasks</h3>
        {todos.filter((todo) => todo.done).length ? (
          <ul>
            {todos
              .filter((todo) => todo.done)
              .map((todo, index) => (
                <li key={index} className="todo-item completed">
                  <span>{todo.todo}</span>
                  <div className="todo-btns">
                    <button onClick={() => markDone(todo)}>
                      Mark as Incomplete
                    </button>
                    <button onClick={() => deleteTodo(todo)}>Delete</button>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p>You have not completed any tasks yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
