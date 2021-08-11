import React from 'react';
import { useDispatch } from 'react-redux';
import { completeGoal, removeGoal } from '../goalSlice';
import Confetti from "react-dom-confetti";

const GoalEntry = ({ text, id, isDone }) => {
  const dispatch = useDispatch();

  const handleCompleteGoal = () => dispatch(completeGoal(id));
  const handleRemoveGoal = () => dispatch(removeGoal(id));

  return (
    <div className='goal-entry-container'>
      <div className='goal-entry-actions-container'>
        <button onClick={handleCompleteGoal} type='button' className='done-button'>
          Done
          <Confetti active={isDone} config={{ spread: 90, elementCount: 100, colors: ['red', 'yellow', 'blue', 'green'] }} />
        </button>
        <button onClick={handleRemoveGoal} type='button' className='remove-button'>Remove</button>
      </div>
      {text}
    </div>
  );
};

export default GoalEntry;