import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../goalSlice';

const GoalForm = () => {
  const [goal, setGoal] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal) return;

    dispatch(addGoal(goal));
    setGoal('');
  };

  const handleChange = (e) => {
    setGoal(e.target.value);
  };

  return (
    <div className='goal-form-container'>
      <h3>What's on your mind today?</h3>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <input
            id='new-goal'
            type='text'
            value={goal}
            onChange={handleChange}
            aria-label='New goal' />
          <label htmlFor='new-goal'>New goal</label>
        </div>
        <input type="submit" style={{display: 'none'}} />
      </form>
    </div>
  )
};

export default GoalForm;