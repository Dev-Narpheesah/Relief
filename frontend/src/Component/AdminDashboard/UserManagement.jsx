import React, { useState } from 'react';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className={styles.userManagement}>
      <h4>Add New User</h4>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles.add} onClick={addUser}>Add User</button>
      </div>
      <h4>User List</h4>
      <ul className={styles.userList}>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <div>

            <button className={styles.userBtn} onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
