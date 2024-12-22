'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function AuthProvider({ children }) {
  const { user } = useUser();
  const userChecked = useRef(false);

  // Function to check and insert new user
  const checkAndInsertUser = useCallback(async () => {
    if (!user || userChecked.current) return;

    try {
      // Call your API to handle user creation or update
      const userData = {
        primaryEmailAddress: {
          emailAddress: user.primaryEmailAddress,
        },
        fullName: user.fullName,
      };

      const response = await axios.post('/api/create-user', { user: userData });

      console.log('Response from create user:', response.data);

      // Mark user as checked to avoid redundant calls
      userChecked.current = true;
    } catch (error) {
      console.error('Error in user check:', error);
    }
  }, [user]);

  useEffect(() => {
    checkAndInsertUser();
  }, [checkAndInsertUser]);

  return <div>{children}</div>;
}

export default AuthProvider;
