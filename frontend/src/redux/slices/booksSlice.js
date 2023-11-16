import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createBookWithId } from '../../utils/createBookWithId'

const initialState = []

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
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get('http://localhost:4000/random-book')
    if (res?.data?.author && res?.data?.title) {
      dispatch(addBook(createBookWithId(res.data, 'API')))
    }
  } catch (error) {
    console.log(error)
  }
}

export const selectBooks = (state) => state.books

export default booksSlice.reducer
