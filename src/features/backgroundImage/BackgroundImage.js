import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectImageUrls,
  selectCurrentBackgroundImageIndex,
  selectisLoadingBackgroundImage,
  getBackgroundImage } from './backgroundImageSlice';

const BackgroundImage = () => {
  const urls = useSelector(selectImageUrls);
  const currentIndex = useSelector(selectCurrentBackgroundImageIndex);
  const isLoading = useSelector(selectisLoadingBackgroundImage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBackgroundImage());
  }, [dispatch]);

  if (isLoading) {
    return <div className='loading-background-image'>Loading</div>
  };

  return (
    <div className='background-image-container'>
      <img src={urls[currentIndex]} alt='Background' className='fade' />
    </div>
  );
};

export default BackgroundImage;