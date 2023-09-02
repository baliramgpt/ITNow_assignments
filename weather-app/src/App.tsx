import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { AppDispatch } from './redux/store';
import { fetchWeatherByCity, fetchWeatherByLocation } from './redux/weatherSlice';

const App: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    // Fetch weather data for the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(fetchWeatherByLocation({lat: position.coords.latitude, lon: position.coords.longitude}));
    }, (error) => {
      console.log(error);
    });
  }, [dispatch]);

  const searchWeatherByCity = () => {
    dispatch(fetchWeatherByCity(cityName));
  };

  return (
    <div className="weather-container">
      <h1 className="heading">Weather App</h1>
      <div className="input-container">
        <h2>Current Location Weather</h2>
        <p>City Name: {weatherData.cityName}</p>
        <p>Latitude: {weatherData.latitude}</p>
        <p>Longitude: {weatherData.longitude}</p>
        <p>Timezone: {weatherData.timezone}</p>
      </div>
      <div>
        <h2>Search by City</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="input"
        />
        <button onClick={searchWeatherByCity} className='button'>Search</button>
      </div>
      <div className='weather-container'> 
          <h2>Weather in {weatherData.cityName}</h2>
          <p>Temperature: {Math.round((+weatherData.temperature - 273.15)*100)/100}°C</p>
          <p>Weather description: {weatherData.description}</p> 
        </div>
        {weatherData.error && (
        <div className='error-container'>
          <p className='error-text'>Error: {weatherData.error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
