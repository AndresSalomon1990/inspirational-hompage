import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  imageUrls: [],
  currentBackgroundImageIndex: 0,
  isLoadingBackgroundImage: false,
  hasError: false
};

export const getBackgroundImage = createAsyncThunk(
  'backgroundImage/getBackgroundImage',
  async () => {
    const data = await fetch('/images');
    const json = await data.json();
    const urls = json.map(i => i.urls.full);
    return urls;
  }
);

export const backgroundImageSlice = createSlice({
  name: 'backgroundImage',
  initialState: initialState,
  reducers: {
    nextBackgroundImage: (state, action) => {
      let n = state.currentBackgroundImageIndex + 1;
      if (n > state.imageUrls.length - 1) n = 0;
      state.currentBackgroundImageIndex = n;
    },
    previousBackgroundImage: (state, action) => {
      let n = state.currentBackgroundImageIndex - 1;
      if (n < 0) n = state.imageUrls.length - 1;
      state.currentBackgroundImageIndex = n;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBackgroundImage.pending, (state) => {
        state.isLoadingBackgroundImage = true;
        state.hasError = false;
      })
      .addCase(getBackgroundImage.fulfilled, (state, action) => {
        state.imageUrls = action.payload;
        state.currentBackgroundImageIndex = 0;
        state.isLoadingBackgroundImage = false;
        state.hasError = false;
      })
      .addCase(getBackgroundImage.rejected, (state) => {
        state.isLoadingBackgroundImage = false;
        state.hasError = true;
      })
  }
});

export const { nextBackgroundImage, previousBackgroundImage } = backgroundImageSlice.actions;
export const selectImageUrls = state => state.backgroundImage.imageUrls;
export const selectCurrentBackgroundImageIndex = state => state.backgroundImage.currentBackgroundImageIndex;
export const selectisLoadingBackgroundImage = state => state.backgroundImage.isLoadingBackgroundImage;
export default backgroundImageSlice.reducer;