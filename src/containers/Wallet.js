import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deposit, selectUser, selectBalance, withdraw } from '../reducers/walletSlice';

const Wallet = () => {
  const user = useSelector(selectUser);
  const balance = useSelector(selectBalance);
  
  const [currentAmount, setCurrentAmount] = useState();
  
  const dispatch = useDispatch();
  
  const handleWithdraw = (amount) => {
    dispatch(withdraw(amount));
  }
  const handleDeposit = (amount) => {
    dispatch(deposit(amount));
  }
  
  return (
    <div>
      <h1>{user} Wallet</h1>
      <h2>Balance: Rp {balance.toLocaleString('ID')}</h2>
      <button onClick={() => handleWithdraw(10000)}>Withdraw Rp 10.000</button>
      <button onClick={() => handleDeposit(10000)}>Deposit Rp 10.000</button>
      <br />
      <input type="number" onChange={(e) => setCurrentAmount(parseInt(e.target.value))} />
      <button onClick={() => handleWithdraw(currentAmount)}>Withdraw</button>
      <button onClick={() => handleDeposit(currentAmount)}>Deposit</button>
    </div>
    )
}

export default Wallet;