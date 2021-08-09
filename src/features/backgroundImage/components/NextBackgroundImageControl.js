import React from 'react';
import { useDispatch } from 'react-redux';
import { nextBackgroundImage } from '../backgroundImageSlice';

const NextBackgroundImageControl = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(nextBackgroundImage());
  };

  return (
    <button
      onClick={handleClick}
      type='button'
      className='control-background-image-next'
      aria-label='Switch to the next wallpaper'
    >
      &#10095;
    </button>
  );
};

export default NextBackgroundImageControl;