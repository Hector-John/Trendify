import React, { useState } from 'react';
import './Orders.scss';
import axios from 'axios';

const Orders = () => {
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/place', {
        userId,
        items: JSON.parse(items), // Assuming items are passed as a JSON string
        amount,
        address: JSON.parse(address) // Assuming address is passed as a JSON string
      });
      if (response.data.success) {
        setMessage('Order created successfully!');
      } else {
        setMessage('Error: ' + response.data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <textarea
          placeholder="Items (JSON format)"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Address (JSON format)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Orders;
