import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types";

const initialState: Post.Category[] = [];

export const categoriesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Post.Category[]>) {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
