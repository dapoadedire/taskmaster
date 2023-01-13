import { useState, useEffect, div } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faTrashCan,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAutoAnimate } from '@formkit/auto-animate/react'

function App() {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
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

  function moveUp(todo) {
    const currentIndex = todos.findIndex((item) => item.id === todo.id);
    if (currentIndex > 0) {
      const newTodos = [...todos];
      newTodos.splice(currentIndex, 1);
      newTodos.splice(currentIndex - 1, 0, todo);
      setTodos(newTodos);
    }
  }

  function moveDown(todo) {
    const currentIndex = todos.findIndex((item) => item.id === todo.id);
    if (currentIndex < todos.length - 1) {
      const newTodos = [...todos];
      newTodos.splice(currentIndex, 1);
      newTodos.splice(currentIndex + 1, 0, todo);
      setTodos(newTodos);
    }
  }

  return (
    <div className="font-mono">
      <header className="h-32">
        <h1 className="text-center flex justify-center items-center h-full font-extrabold text-5xl">Todo List</h1>
      </header>
      <main>
        <div className="w-1/2 mx-auto" ref={parent}>
          <form
            className="flex mb-20"
            onSubmit={(e) => {
              e.preventDefault();
              addTodo(todo);
            }}
          >
            <input
              type="text"
              value={todo}
              placeholder="Add a new task"
              onChange={(e) => setTodo(e.target.value)}
              required="false"
              className="flex-grow rounded-lg border-gray-400 border-2 p-3"
            />

            <button
              type="submit"
              className="rounded-lg border-gray-400 border-2 ml-3 p-3 w-20 font-bold"
            >
              <FontAwesomeIcon icon={faAdd} className="font-bold" />
            </button>
          </form>

          <div ref={parent} className="rounded-lg border-gray-300 border-2 mb-10 p-4">
            <h3 className="text-center py-4 underline font-bold text-lg">
              Pending Tasks
            </h3>
            {todos.filter((todo) => todo.done === false).length ? (
              <ul ref={parent}>
                {todos
                  .filter((todo) => todo.done === false)
                  .map((todo, index) => (
                    <li
                      key={index}
                      className="rounded border-gray-200 border-2 my-4 flex p-3 align-center"
                    >
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => moveUp(todo)}
                        className="text-teal-600 cursor-pointer mx-1 p-3"
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => moveDown(todo)}
                        className=" text-teal-600 cursor-pointer mx-1 p-3"
                      />
                      <span className="flex-grow mx-1 p-3">{todo.todo}</span>

                      <FontAwesomeIcon
                        icon={faCheck}
                        onClick={() => markDone(todo)}
                        className="ml-2 text-teal-600 w-5 cursor-pointer mx-1 p-3"
                      />

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => deleteTodo(todo)}
                        className="mx-1 p-3 border-red-600 text-red-600"
                      />
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="rounded border-gray-200 border-2 my-4 flex p-3">
                You have no pending tasks. Why not add one?
              </p>
            )}
          </div>
          <div className="rounded-lg border-gray-300 border-2 mb-10 p-4">
            <h3 className="text-center py-4 underline font-bold text-lg">
              Completed Tasks
            </h3>
            {todos.filter((todo) => todo.done).length ? (
              <ul>
                {todos
                  .filter((todo) => todo.done)
                  .map((todo, index) => (
                    <li
                      key={index}
                      className="rounded-lg border-gray-200 border-2 my-4 flex p-3 "
                    >
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => moveUp(todo)}
                        className="mx-1 p-3 text-teal-600 cursor-pointer"
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => moveDown(todo)}
                        className=" mx-1 p-3 text-teal-600 cursor-pointer"
                      />
                      <span className="flex-grow line-through mx-1 p-3">
                        {todo.todo}
                      </span>
                      <div className="todo-btns">
                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={() => markDone(todo)}
                          className="text-teal-600 cursor-pointer mx-1 p-3"
                        />

                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => deleteTodo(todo)}
                          className="cursor-pointer p-3 mx-1 text-red-600  w-5"
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>You have not completed any tasks yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
