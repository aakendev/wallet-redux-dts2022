import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { user: {
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  avatar: ""
}, balance: 500000 };

export const userAsync = createAsyncThunk(
  'wallet/fetchUser',
  async (id) => {
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    return response.data.data;
  }
)

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      if(state.balance >= action.payload){
        state.balance -= action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userAsync.pending, () => {
        console.log('loading');
      })
      .addCase(userAsync.rejected, () => {
        console.log('fail to get user');
      })
  }
});

export const { deposit, withdraw } = walletSlice.actions;

export const selectUser = state => state.wallet.user;
export const selectBalance = state => state.wallet.balance;

export default walletSlice.reducer;