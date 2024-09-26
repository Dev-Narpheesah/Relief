import React, { useState } from 'react';
import styles from './UpdateProfile.module.css';

const UpdateProfile = ({ profile, setProfile }) => {
  const [username, setUsername] = useState(profile.username);
  const [image, setImage] = useState(profile.image);

  const handleUpdate = () => {
    setProfile({ ...profile, username, image });
    alert('Profile updated!');
  };

  return (
    <div className={styles.updateProfile}>
      <h2>Update Profile</h2>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Profile Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button className={styles.saveButton} onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
};

export default UpdateProfile;
