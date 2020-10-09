import React, { useState} from "react";
import { useTodos } from "../hooks";

export default () => {
  const { todos, addTodo, deleteTodo, completeTodo } = useTodos();
  const [inputText, setInputText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(inputText);
    setInputText("");
  }

  function handleComplete(id) {
    completeTodo(id);
  }

   return (
    <div className="container">
      <h1>todos</h1>
     
      <div>
        <form className="form" onSubmit={handleSubmit}>
         <span className="arrow">&#8964;</span>
          <input
            className="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder=" What needs to be done?"
          />
        </form>
          <ul>
          {todos.map((item) => {
            return (
              <li className="list">
                <input
                className="checkbox"
                  type="checkbox"
                  onClick={() => handleComplete(item.id)}
                />
                <span className={item.completed === true ? "completed" : ""}>
                  {item.text}
                </span>
                <button className="delete" onClick={() => deleteTodo(item.id)}>
                &#10005;
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
