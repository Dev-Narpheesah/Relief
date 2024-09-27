import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";
import UserManagement from "./UserManagement";
import Reports from "./Reports";
import AdminHead from "./AdminHead";
import ResourceManagement from "./ResourceManagement";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/admin/total-users"
        );
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users", error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className={styles.dashboard}>
      <AdminHead />

      <div className={styles.welcome}>
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Manage your resources and monitor key metrics effortlessly.</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <img src="lady.jpeg" alt="Users" className={styles.statIcon} />
          <div>
            <h3>Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>
        <div className={styles.statItem}>
          <img
            src="globe.jpeg"
            alt="Resources"
            className={styles.statIcon}
          />
          <div>
            <h3>Resources</h3>
            <p>567</p>
          </div>
        </div>
        <div className={styles.statItem}>
          <img
            src="natural.jpeg"
            alt="Reports"
            className={styles.statIcon}
          />
          <div>
            <h3>Reports</h3>
            <p>89</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <section id={styles.users}>
          <h3>Manage Users</h3>
          <UserManagement />
        </section>
        <section id={styles.resources}>
          <h3>Manage Resources</h3>
          <ResourceManagement />
        </section>
        <section id={styles.reports}>
          <h3>View Reports</h3>
          <Reports />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;



