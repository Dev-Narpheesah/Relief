import React, {useContext} from 'react';
import './DashboardHeader.css';
import { AuthContext } from '../../../Context/AuthContext';

export const shortenText = (text, n) => {
    if (text.length > n) {
      const shoretenedText = text.substring(0, n).concat("...");
      return shoretenedText;
    }
    return text;
  };
  
const DashboardHeader = () => {
    const { user } = useContext(AuthContext); // Mock user data
  
  return (
    <header className="dashboard-header">
     <h1>Hi {user ? shortenText(user.username, 10) : "Guest"} </h1>
      <p>Here&apos;s the latest update on your disaster reports.</p>
    </header>
  );
};

export default DashboardHeader;
