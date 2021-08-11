import React from 'react';
import { useSelector } from 'react-redux';
import GoalEntry from './GoalEntry';
import { selectGoals } from '../goalSlice';

const GoalEntries = () => {
  const goals = useSelector(selectGoals);

  const COLORS = ['red', 'blue', 'green', 'orange'];
  const getGoalColor = index => COLORS[index % COLORS.length];

  return (
    <div className='goal-entries-container'>
      <ul>
        {goals.map((g, index) => (
          <li key={g.id} className={`${getGoalColor(index)}`}>
            <GoalEntry id={g.id} isDone={g.isDone} text={g.text} />
          </li>
        ))}
      </ul>
    </div>
  )
};

export default GoalEntries;