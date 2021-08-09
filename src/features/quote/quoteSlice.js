import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  quote: '',
  author: '',
  isLoading: false,
  hasError: false
};

export const getQuote = createAsyncThunk(
  'quote/getQuote',
  async () => {
    const response = await fetch('quote');
    const json = await response.json();
    const data = {
      quote: json.contents.quotes[0].quote,
      author: json.contents.quotes[0].author,
    }
    return data;
  }
);

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuote.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        const { quote, author } = action.payload;
        state.quote = quote;
        state.author = author;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getQuote.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  }
});

export const selectQuote = state => state.quote;
export default quoteSlice.reducer;