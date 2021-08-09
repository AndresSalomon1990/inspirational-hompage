import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuote, getQuote } from './quoteSlice';

const Quote = () => {
  const { quote, author } = useSelector(selectQuote);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuote());  
  }, [dispatch]);

  return (
    <div className='quote-container'>
      <p>"{quote}"</p>
      <p>{author}</p>
      <a href='https://theysaidso.com'>https://theysaidso.com</a>
    </div>
  );
};

export default Quote;