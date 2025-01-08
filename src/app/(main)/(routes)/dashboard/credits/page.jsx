// app/credits/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import CreditPackages from '../../../_components/credit-packages';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function CreditsPage() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('user Email: ', userEmail);

  const handlePackageSelect = async (selectedPackage) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          packageId: selectedPackage.id,
          amount: selectedPackage.price,
          credits: selectedPackage.credits,
        }),
      });

      const data = await response.json();

      if (data.success && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError(data.error || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Failed to initialize payment:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!userEmail) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-500">Please log in to purchase credits.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose Your Credit Package
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <CreditPackages
        onSelectPackage={handlePackageSelect}
        isLoading={loading}
      />
    </div>
  );
}
