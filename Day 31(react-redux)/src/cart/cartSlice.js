import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload)
    },
    removeFromCart: (state, action) => {
        console.log("Hello")
      return state.filter(item => item.id !== action.payload);
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer