import React from 'react';
import { useDispatch } from 'react-redux';
import { previousBackgroundImage } from '../backgroundImageSlice';

const PreviousBackgroundImageControl = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(previousBackgroundImage());
  };

  return (
    <button 
      onClick={handleClick} 
      type='button'
      className='control-background-image-prev'
      aria-label='Switch to previous wallpaper'
    >
      &#10094;
    </button>
  );
};

export default PreviousBackgroundImageControl;