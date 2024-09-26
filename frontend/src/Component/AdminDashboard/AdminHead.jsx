import React from 'react';
import styles from './AdminHead.module.css';
import AdminSide from "./AdminSide";

const AdminHead = () => {
  return (
    <header className={styles.adminHeader}>
      <AdminSide />
      <h1> Relief </h1>
      <div className={styles.userInfo}>
        <span>Admin </span>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default AdminHead;
