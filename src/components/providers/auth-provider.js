// components/AuthProvider.js
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function AuthProvider({ children }) {
  const { user } = useUser();
  const userChecked = useRef(false);

  const checkAndInsertUser = useCallback(async () => {
    if (!user || userChecked.current) return;

    try {
      const userData = {
        primaryEmailAddress: {
          emailAddress: user.primaryEmailAddress,
        },
        fullName: user.fullName,
      };

      await axios.post('/api/create-user', { user: userData });
      userChecked.current = true;
    } catch (error) {
      console.error('Error checking user:', error);
    }
  }, [user]);

  useEffect(() => {
    checkAndInsertUser();
  }, [checkAndInsertUser]);

  return children;
}

export default AuthProvider;
