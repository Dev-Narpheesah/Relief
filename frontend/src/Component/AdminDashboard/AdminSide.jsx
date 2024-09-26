// import React, { useState } from 'react';
// import './AdminSide.css';
// import { IoClose } from 'react-icons/io5';
// import { MdMenu } from 'react-icons/md';
// import { Link } from 'react-router-dom';

// const AdminSide = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <button className="toggleButton" onClick={toggleSidebar}>
//         {isOpen ? <IoClose className="icon" /> : <MdMenu className="icon" />}
//       </button>
//       <nav className="menu">
//         <Link to="/admin" className="menuItem">Dashboard</Link>
//         <Link to="/user-management" className="menuItem">Users</Link>
//         <Link to="/resource" className="menuItem">Resources</Link>
//         <Link to="/report" className="menuItem">Reports</Link>
//       </nav>
//     </div>
//   );
// };

// export default AdminSide;




import React from 'react'

const AdminSide = ({ open, setOpen }) => {
  return (
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
}

export default AdminSide
