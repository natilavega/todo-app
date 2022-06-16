import { useState, useEffect } from 'react';
import { getUserById } from '../services/firebase';

const useUser = (userId) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = async () => {
    await getUserById(userId).then((user) => setUser(user));
  };

  return { user };
};

export default useUser;
