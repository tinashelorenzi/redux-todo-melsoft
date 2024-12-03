# Redux Todo App

This is a simple Todo List application built with **React** and **Redux Toolkit**. It allows users to:

- Add new tasks
- Mark tasks as completed
- Delete tasks

This project serves as an educational tool to demonstrate how to integrate Redux into a React application.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Code Overview](#code-overview)
  - [Redux Setup](#redux-setup)
    - [Store](#store)
    - [Todo Slice](#todo-slice)
  - [Components](#components)
    - [TodoInput](#todoinput)
    - [TodoItem](#todoitem)
    - [TodoList](#todolist)
    - [App](#app)
- [Best Practices](#best-practices)
- [Extending the App](#extending-the-app)
- [Resources](#resources)
- [License](#license)

## Demo

<here>

## Features

- **Add Todos**: Users can add new tasks to the list.
- **Mark as Completed**: Users can mark tasks as completed or not completed.
- **Delete Todos**: Users can remove tasks from the list.

## Project Structure

```
redux-todo-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── TodoInput.js
│   │   ├── TodoItem.js
│   │   └── TodoList.js
│   ├── redux/
│   │   ├── store.js
│   │   └── todoSlice.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/redux-todo-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd redux-todo-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm start
```

The app should automatically open in your default browser at `http://localhost:3000`. If not, open your browser and navigate to that address.

## Usage

- **Add a Todo:**

  - Type a task into the input field.
  - Click the **Add Todo** button or press **Enter**.

- **Toggle Completion:**

  - Click the checkbox next to a task to mark it as completed or not completed.

- **Delete a Todo:**

  - Click the **Delete** button next to a task to remove it from the list.

## Code Overview

### Redux Setup

#### Store

**File:** `src/redux/store.js`

```javascript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
```

- **Explanation:** Sets up the Redux store using `configureStore` from Redux Toolkit. Combines reducers (only `todoReducer` in this case).

#### Todo Slice

**File:** `src/redux/todoSlice.js`

```javascript
import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 1;

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nextTodoId++,
            text,
            completed: false,
          },
        };
      },
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todoDeleted(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { todoAdded, todoToggled, todoDeleted } = todoSlice.actions;
export default todoSlice.reducer;
```

- **Explanation:** Uses `createSlice` to create actions and reducers for todos.
  - **Actions:**
    - `todoAdded`: Adds a new todo.
    - `todoToggled`: Toggles the completion status of a todo.
    - `todoDeleted`: Deletes a todo.
  - **State:** An array of todo objects.

### Components

#### TodoInput

**File:** `src/components/TodoInput.js`

```javascript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdded } from '../redux/todoSlice';

function TodoInput() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(todoAdded(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoInput;
```

- **Explanation:** Handles user input and dispatches the `todoAdded` action to add a new todo.

#### TodoItem

**File:** `src/components/TodoItem.js`

```javascript
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
```

- **Explanation:** Represents a single todo item with options to toggle its completion status or delete it.

#### TodoList

**File:** `src/components/TodoList.js`

```javascript
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useSelector((state) => state.todos);

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
```

- **Explanation:** Retrieves the list of todos from the Redux store and renders each one using `TodoItem`.

#### App

**File:** `src/App.js`

```javascript
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
```

- **Explanation:** The main component that assembles the `TodoInput` and `TodoList` components.

## Best Practices

- **Organize Your Code:** Separate concerns by organizing code into `components` and `redux` directories.
- **Use Redux Toolkit:** Simplifies Redux setup and reduces boilerplate code.
- **Avoid Direct Data Mutation:** Redux Toolkit uses Immer.js to handle immutable updates.
- **Use Meaningful Names:** Clearly name actions, variables, and functions.
- **Keep Components Focused:** Each component should have a single responsibility.

## Extending the App

Here are some ideas to further develop the application:

- **Add Filters:**
  - Implement filters to view all, active, or completed todos.
  - Update the Redux state to handle the current filter.
- **Persist Todos with localStorage:**
  - Save the todos in `localStorage` so they persist across page reloads.
  - Use `useEffect` to load and save todos.
- **Add Edit Functionality:**
  - Allow users to edit existing todos.
  - Implement an `editing` state to handle inline editing.
- **Implement Due Dates:**
  - Allow users to assign due dates to todos.
  - Sort or filter todos based on their due dates.

## Resources

- **Official Redux Documentation:** [https://redux.js.org/](https://redux.js.org/)
- **Redux Toolkit Documentation:** [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
- **React Redux Documentation:** [https://react-redux.js.org/](https://react-redux.js.org/)
- **React Documentation:** [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)

## License

This project is for educational purposes.

---

Feel free to explore the code, experiment with new features, and use this project as a learning tool to understand how Redux integrates with React.