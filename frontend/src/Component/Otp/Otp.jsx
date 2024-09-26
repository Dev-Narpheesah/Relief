import React, { useState } from 'react';
import './Otp.css';

const Otp = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP submission functionality
    console.log('OTP submitted:', otp);
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <a href="#">Resend OTP</a>
    </div>
  );
};

export default Otp;
