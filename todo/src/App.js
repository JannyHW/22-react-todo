import './App.css'
import React from 'react'
import store from './store.js'
import { Provider } from 'react-redux'
import TodoApp from './components/TodoApp'
//To connect all State with the TodoApp by adding store inside <Provder>  
function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}

export default App
