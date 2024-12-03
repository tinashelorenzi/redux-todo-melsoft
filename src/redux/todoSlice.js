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
