import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGoals: [
    { text: 'Water plants', isDone: false },
    { text: 'Wash dishes', isDone: false },
    { text: 'Study for the exam', isDone: false }
  ],
  goalsDone: []
};

export const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    addGoal: (state, action) => {
      const text = action.payload;
      state.allGoals.push({ text: text, isDone: false });
    },
    completeGoal: (state, action) => {
      const id = action.payload;
      const index = state.allGoals.findIndex(g => g.id === id);
      if (index !== -1) {
        state.allGoals[index].done = true;
        state.goalsDone.push(state.allGoals[index]);
      };
    },
    removeGoal: (state, action) => {
      const id = action.payload;
      const index = state.allGoals.findIndex(g => g.id === id)
      if (index !== -1) state.allGoals.splice(index, 1);
    }
  }
});

export const { addGoal, completeGoal, removeGoal } = goalSlice.actions;
export default goalSlice.reducer;