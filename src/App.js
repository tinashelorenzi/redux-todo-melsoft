import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Redux Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
