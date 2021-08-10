import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWeather,
  getWeather,
  setCoordinates,
  setError
} from './weatherSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

const Weather = () => {
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();

  // ask for geolocation permissions to get the coordinates
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
    if (weather.lat && weather.lon) dispatch(getWeather({ lat: weather.lat, lon: weather.lon }));
  }, [dispatch, weather.lat, weather.lon]);

  if (weather.hasError) {
    return (
      <div>
        Failed to get weather. Please allow permissions in your config
      </div>
    );
  } else if (weather.isLoading) {
    return (
      <CircularProgress />
    );
  } else {
    return (
      <div className='weather-container'>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='Weather icon' />
        <div className='weather-info'>
          <p className='weather-temperature'>{weather.temperature.toFixed(1)}°C</p>
          <p>{weather.description.toUpperCase()}</p>
        </div>
      </div>
    );
  }
};

export default Weather;