import React from 'react';
import GoalForm from './components/GoalForm';
import GoalEntries from './components/GoalEntries';
import { useSelector } from 'react-redux';
import { selectWeather } from '../wheater/weatherSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

const Goal = () => {
  const weather = useSelector(selectWeather);

  if (weather.isLoading) {
    return (
      <CircularProgress />
    )
  } else {
    return (
      <div className='goal-container'>
        <GoalForm />
        <GoalEntries />
      </div>
    );
  }
};

export default Goal;