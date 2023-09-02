import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the weather slice
const initialState = {
  cityName: '',
  latitude: 0,
  longitude: 0,
  timezone: '',
  loading: false,
  error: "",
  description: "",
  temperature: "",
};

// Create an async thunk to fetch weather data by location
export const fetchWeatherByLocation = createAsyncThunk(
  'weather/fetchByLocation',
  async (coords: { lat: number; lon: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=1f0f98f14a00eda7af1df3787f6ad9a1`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create an async thunk to fetch weather data by city
export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f0f98f14a00eda7af1df3787f6ad9a1`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create the weather slice using createSlice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cityName = action.payload.name;
        state.latitude = action.payload.coord.lat;
        state.longitude = action.payload.coord.lon;
        state.timezone = action.payload.timezone;
        state.description = action.payload.weather[0].description;
        state.temperature = action.payload.main.temp;
      })
      .addCase(fetchWeatherByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.cityName = action.payload.name;
        state.latitude = action.payload.coord.lat;
        state.longitude = action.payload.coord.lon;
        state.timezone = action.payload.timezone;
        state.description = action.payload.weather[0].description;
        state.temperature = action.payload.main.temp;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default weatherSlice.reducer;
