//ducks: bundling action definition, action creators, reducers, and custom hook together
import { useSelector, useDispatch } from "react-redux";


//action definitions
const ADD_TODO = "todo/ADD_TODO";
const DELETE_TODO = "todo/DELETE_TODO";
const COMPLETED_TODO = "todo/COMPLETE_TODO";

//initial state
const initialState = {
  todos: [],
};

//create random id number
function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: generateId(), text: action.payload, completed: false },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case COMPLETED_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};

//action creators
function addItemTodo(input) {
  return {
    type: ADD_TODO,
    payload: input,
  };
}

function deleteItemTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}

function completeItemTodo(id) {
  let completed = ADD_TODO.completed;
  if (completed === false) {
    return {
      completed: true,
      type: COMPLETED_TODO,
      payload: id,
    };
  } else {
    return {
      completed: false,
      type: COMPLETED_TODO,
      payload: id,
    };
  }
}

// custom hook
export function useTodos() {
  const dispatch = useDispatch();
  const todos = useSelector((app) => app.todoState.todos);
  const addTodo = (input) => dispatch(addItemTodo(input));
  const deleteTodo = (id) => dispatch(deleteItemTodo(id));
  const completeTodo = (id) => dispatch(completeItemTodo(id));
  return {
    todos,
    addTodo,
    deleteTodo,
    completeTodo,
  };
}
