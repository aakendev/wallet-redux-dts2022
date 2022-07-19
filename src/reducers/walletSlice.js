import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: 'Aldy', balance: 500000 };

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
    }
  }
});

export const { deposit, withdraw } = walletSlice.actions;

export const selectUser = state => state.wallet.user;
export const selectBalance = state => state.wallet.balance;

export default walletSlice.reducer;