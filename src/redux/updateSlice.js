import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  movie: null,
};

const updateSlice = createSlice({
  name: "updateSlice",
  initialState,
  reducers: {
    updateUserAction: (state, action) => {
      state.user = action.payload;
    },
    updateMovieAction: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { updateUserAction, updateMovieAction } = updateSlice.actions;

export default updateSlice.reducer;
