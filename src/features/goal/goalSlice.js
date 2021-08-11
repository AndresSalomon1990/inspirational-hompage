import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  goals: [
    { id: uuidv4(), text: 'Water plants', isDone: false },
    { id: uuidv4(), text: 'Wash dishes', isDone: false },
    { id: uuidv4(), text: 'Study for the exam', isDone: false }
  ]
};

export const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    addGoal: (state, action) => {
      const text = action.payload;
      state.goals.push({ id: uuidv4(), text: text, isDone: false });
    },
    completeGoal: (state, action) => {
      const id = action.payload;
      const index = state.goals.findIndex(g => g.id === id);
      if (index !== -1) {
        state.goals[index].isDone = true;
      };
    },
    removeGoal: (state, action) => {
      const id = action.payload;
      const index = state.goals.findIndex(g => g.id === id)
      if (index !== -1) state.goals.splice(index, 1);
    }
  }
});

export const { addGoal, completeGoal, removeGoal } = goalSlice.actions;
export const selectGoals = state => state.goal.goals;
export default goalSlice.reducer;