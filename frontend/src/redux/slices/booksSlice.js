import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { createBookWithId } from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = []

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      throw error
    }
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // You can mutate state thanks to Immer library
      state.push(action.payload)
      // You can also return new state as usually
      //  return [...state, action.payload]
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },

    toggleFavorite: (state, action) => {
      // You can mutate state thanks to Immer library
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
      // You can also return new state as usually
      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavorite: !book.isFavorite }
      //       : book
      //   )
    },
  },
  ////OPTION 1
  extraReducers: {
    [fetchBook.fulfilled]: (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, 'API'))
      }
    },
  },
  //// OPTION 2
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBookWithId(action.payload, 'API'))
  //     }
  //   })
  // },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books

export default booksSlice.reducer
