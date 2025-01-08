// hooks/use-credits.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

export function useCredits() {
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchCredits = async () => {
      setIsLoading(true);
      setError(null);

      // Ensure the user data is loaded before making the request
      if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) {
        console.warn('User data is not loaded or email is unavailable');
        setCredits(0);
        setIsLoading(false);
        return;
      }

      try {
        const email = user.primaryEmailAddress.emailAddress;
        const response = await axios.get(`/api/user-credits?email=${email}`);
        console.log('Credits fetched successfully:', response.data.credits);
        setCredits(response.data.credits ?? 0);
      } catch (error) {
        console.error('Failed to fetch credits:', error);
        setError(error.message);
        setCredits(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchCredits();
    }
  }, [user?.primaryEmailAddress?.emailAddress, isLoaded]);

  const refreshCredits = async () => {
    if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) {
      return;
    }
    setIsLoading(true);
    try {
      const email = user.primaryEmailAddress.emailAddress;
      const response = await axios.get(`/api/user-credits?email=${email}`);
      setCredits(response.data.credits ?? 0);
    } catch (error) {
      console.error('Failed to refresh credits:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { credits, isLoading, error, refreshCredits };
}
