import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  onlyFavourite: false,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // You can mutate state thanks to Immer library
      state.title = action.payload
      // You can also return new state as usually
      // return { ...state, title: action.payload }
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload
    },
    setOnlyFavouriteFilter: (state) => {
      state.onlyFavourite = !state.onlyFavourite
    },
    resetFilters: () => {
      return initialState
    },
  },
})

export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavouriteFilter,
  resetFilters,
} = filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title

export const selectAuthorFilter = (state) => state.filter.author

export const selectOnlyFavouriteFilter = (state) => state.filter.onlyFavourite

export default filterSlice.reducer
