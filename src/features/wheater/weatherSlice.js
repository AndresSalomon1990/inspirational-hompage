import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  lat: '',
  lon: '',
  icon: '',
  description: '',
  temperature: '',
  isLoadingWeather: true, // starts true because it will ask for geolocation permissions
  hasError: false
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async ({ lat, lon }) => {
    const data = await fetch(`/weather?lat=${lat}&lon=${lon}`);
    const json = await data.json();
    const weatherData = {
      icon: json.weather[0].icon,
      description: json.weather[0].description,
      temperature: json.main.temp
    }

    return weatherData;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialState,
  reducers: {
    setCoordinates: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.lat = latitude;
      state.lon = longitude;
    },
    setError: (state, action) => {
      state.hasError = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.isLoadingWeather = true;
        state.hasError = false;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.icon = action.payload.icon;
        state.description = action.payload.description;
        state.temperature = action.payload.temperature;
        state.isLoadingWeather = false;
        state.hasError = false;
      })
      .addCase(getWeather.rejected, (state) => {
        state.isLoadingWeather = false;
        state.hasError = true;
      })
  }
});

export const { setCoordinates, setError } = weatherSlice.actions;
export const selectIcon = state => state.weather.icon;
export const selectDescription = state => state.weather.description;
export const selectTemperature = state => state.weather.temperature;
export const selectIsLoadingWeather = state => state.weather.isLoadingWeather;
export const selectHasError = state => state.weather.hasError;
export const selectLat = state => state.weather.lat;
export const selectLon = state => state.weather.lon;
export default weatherSlice.reducer;