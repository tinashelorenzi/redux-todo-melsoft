import React from 'react';
import { useDispatch } from 'react-redux';
import { todoToggled, todoDeleted } from '../redux/todoSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;
