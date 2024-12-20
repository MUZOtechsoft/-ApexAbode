import { Avatar, Menu } from '@mantine/core';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Utils/firebase';

const ProfileMenu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => console.log("User logged out"))
      .catch((error) => console.error("Logout failed", error));
  };

  return (
    <Menu openOnHover withinPortal>
      <Menu.Target>
        <Avatar
          className="h-[50px] w-[50px]"
          src={user?.photoURL || 'default-avatar.png'}
          radius="sm"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>Favourites</Menu.Item>
        <Menu.Item>Bookings</Menu.Item>
        <Menu.Label>Go back</Menu.Label>
        <Menu.Item onClick={handleLogout} color='red'>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
