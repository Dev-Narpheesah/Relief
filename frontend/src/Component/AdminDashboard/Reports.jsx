// components/Report.js
import React, { useState } from "react";
import axios from "axios";
import "./Reports.module.css";

const Report = () => {

const [username,setUsername] =useState('');
const [email,setEmail] =useState('');
const [message,setMessage] =useState('');



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http:localhost:4000/api/user/register-user",
        {username, email, message}
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="report">
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e)=>setUsername (e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e)=>setEmail (e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message</label>
        <textarea
          name="message"
          value={message}
          onChange={(e)=>setMessage (e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Report;

