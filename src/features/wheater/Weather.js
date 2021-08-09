import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIcon,
  selectDescription,
  selectTemperature,
  selectLat,
  selectLon,
  selectIsLoadingWeather,
  selectHasError,
  getWeather,
  setCoordinates,
  setError } from './weatherSlice';

const Weather = () => {
  const icon = useSelector(selectIcon);
  const description = useSelector(selectDescription);
  const temperature = useSelector(selectTemperature);
  const lat = useSelector(selectLat);
  const lon = useSelector(selectLon);
  const isLoadingWeather = useSelector(selectIsLoadingWeather);
  const hasError = useSelector(selectHasError);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setCoordinates({
            latitude: latitude,
            longitude: longitude,
          })
        );
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
        dispatch(setError());
      }
    );
  });

  useEffect(() => {
    if (lat && lon) dispatch(getWeather({ lat, lon }));
  }, [dispatch, lat, lon]);

  if (hasError) {
    return (
      <div>
        Failed to get weather. Please allow permissions in your config
      </div>
    );
  };

  if (isLoadingWeather) {
    return (
      <div>
        Loading
      </div>
    );
  };

  return (
    <div className='weather-container'>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='Weather icon' />
      <p>{description}</p>
      <p>{temperature}</p>
    </div>
  );
};

export default Weather;