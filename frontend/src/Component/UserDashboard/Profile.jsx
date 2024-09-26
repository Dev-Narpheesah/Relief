import React, { useState } from 'react';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    image: 'https://example.com/default-avatar.png'
  });

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <img src={profile.image} alt="Profile" width="100" />
        <p>{profile.username}</p>
      </div>

      <UpdateProfile profile={profile} setProfile={setProfile} />
    </div>
  );
};

export default Profile;
