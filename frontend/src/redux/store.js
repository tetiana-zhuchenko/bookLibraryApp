import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import filterReduser from './slices/filterSlice'

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReduser,
  },
})

export default store
