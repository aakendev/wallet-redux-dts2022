import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deposit, selectUser, selectBalance, withdraw, userAsync } from '../reducers/walletSlice';

const Wallet = () => {
  const user = useSelector(selectUser);
  const balance = useSelector(selectBalance);
  
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentId, setCurrentId] = useState();
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userAsync(4));
  }, [])
  
  const handleUserClickId = () => {
    dispatch(userAsync(currentId));
  }
  
  return (
    <div style={{ marginTop: '20px' }}>
      <img src={user.avatar} alt='avatar' />
      <h1>{user.first_name} Wallet</h1>
      <input type='number' onChange={(e) => setCurrentId(e.target.value)}/>
      <button onClick={() => handleUserClickId()}>Get User Id</button>
      <h2>Balance: Rp {balance.toLocaleString('ID')}</h2>
      <button onClick={() => dispatch(withdraw(10000))}>Withdraw Rp 10.000</button>
      <button onClick={() => dispatch(deposit(10000))}>Deposit Rp 10.000</button>
      <br />
      <input type="number" onChange={(e) => setCurrentAmount(parseInt(e.target.value))} />
      <button onClick={() => dispatch(withdraw(currentAmount))}>Withdraw</button>
      <button onClick={() => dispatch(deposit(currentAmount))}>Deposit</button>
    </div>
    )
}

export default Wallet;