import { useState, useEffect } from "react";
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
        <h1 className="flex h-full items-center justify-center text-center text-5xl font-extrabold">
          TaskMaster
        </h1>
      </header>
      <main>
        <div className="mx-auto  w-full px-4 sm:flex sm:w-3/4 sm:flex-wrap sm:gap-10 lg:w-3/5">
          <form
            className="mb-20 flex sm:w-full sm:grow"
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
              className="grow rounded-lg border-2 border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <button
              type="submit"
              className="ml-3 w-20 rounded-lg border-2 border-teal-700 bg-teal-700 p-2 text-xl font-bold text-white hover:bg-teal-600 hover:text-white"
            >
              <FontAwesomeIcon icon={faAdd} className="font-bold" />
            </button>
          </form>

          {/* pending tasks */}

          <div className="mb-10 rounded-lg border-2 border-gray-300 p-2 sm:grow">
            <h3 className="py-4 text-center text-lg font-bold underline">
              Pending Tasks
            </h3>

            {todos.filter((todo) => todo.done === false).length ? (
              <ul>
                {todos
                  .filter((todo) => todo.done === false)
                  .map((todo, index) => (
                    <li
                      key={index}
                      className="my-4 flex items-center rounded-lg border-2 border-gray-200 p-2 hover:bg-gray-100 sm:mx-2"
                    >
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => moveUp(todo)}
                        className="mx-1 cursor-pointer rounded-lg p-2 text-teal-600 hover:bg-teal-100 sm:p-3"
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => moveDown(todo)}
                        className=" mx-1 cursor-pointer rounded-lg p-2  text-teal-600 hover:bg-teal-100 sm:p-3"
                      />
                      <span className="mx-1 grow p-2">{todo.todo}</span>

                      <FontAwesomeIcon
                        icon={faCheck}
                        onClick={() => markDone(todo)}
                        className="mx-1 ml-2 w-5 cursor-pointer rounded-lg p-2  text-teal-600 hover:bg-teal-200 sm:p-3"
                      />

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => deleteTodo(todo)}
                        className="mx-1 cursor-pointer rounded-lg p-2  text-red-600 hover:bg-red-100 sm:p-3"
                      />
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="my-4 flex rounded-lg border-2 border-gray-200 p-2 text-center">
                You have no pending tasks. Why not add one?
              </p>
            )}
          </div>

          {/* Completed todos */}
          <div className="mb-10 rounded-lg border-2 border-gray-300 p-2 sm:grow">
            <h3 className="py-4 text-center text-lg font-bold underline">
              Completed Tasks
            </h3>
            {todos.filter((todo) => todo.done).length ? (
              <ul>
                {todos
                  .filter((todo) => todo.done)
                  .map((todo, index) => (
                    <li
                      key={index}
                      className=" my-4 flex rounded-lg border-2 border-gray-200 p-2 hover:bg-gray-100 sm:mx-2 "
                    >
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => moveUp(todo)}
                        className="mx-1 cursor-pointer rounded-lg p-2  text-teal-600 hover:bg-teal-100 sm:p-3
                       
                        "
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => moveDown(todo)}
                        className=" mx-1 cursor-pointer rounded-lg p-2  text-teal-600 hover:bg-teal-100 sm:p-3"
                      />
                      <span className="mx-1 grow p-2 line-through">
                        {todo.todo}
                      </span>
                      <div className="">
                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={() => markDone(todo)}
                          className="mx-1 cursor-pointer rounded-lg p-2  text-teal-600 hover:bg-teal-200 sm:p-3"
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => deleteTodo(todo)}
                          className="mx-1 cursor-pointer rounded-lg p-2  text-red-600 hover:bg-red-100 sm:p-3"
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="my-4 flex rounded-lg border-2 border-gray-200 p-2 text-center">
                You have no completed tasks.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
