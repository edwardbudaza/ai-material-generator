'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const CreditPackages = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [processingPackageId, setProcessingPackageId] = useState(null);

  const packages = [
    {
      id: 1,
      name: 'Starter Pack',
      credits: 10,
      price: 29.99,
      features: [
        'Basic access to all features',
        '10 AI generations',
        'Email support',
      ],
      isPopular: false,
    },
    {
      id: 2,
      name: 'Professional Pack',
      credits: 30,
      price: 79.99,
      features: [
        'Everything in Starter',
        '30 AI generations',
        'Priority support',
        'Advanced customization',
      ],
      isPopular: true,
    },
    {
      id: 3,
      name: 'Enterprise Pack',
      credits: 100,
      price: 199.99,
      features: [
        'Everything in Professional',
        '100 AI generations',
        '24/7 Premium support',
        'Custom solutions',
        'Dedicated account manager',
      ],
      isPopular: false,
    },
  ];

  const handleSelectPackage = async (pkg) => {
    if (!user) {
      toast.error('Please sign in to purchase credits');
      return;
    }

    setLoading(true);
    setProcessingPackageId(pkg.id);

    try {
      console.log('Sent from credit packages: ', {
        email: user?.primaryEmailAddress?.emailAddress,
        packageId: pkg.id,
        amount: pkg.price,
        credits: pkg.credits,
      });
      const response = await axios.post('/api/create-payment', {
        email: user?.primaryEmailAddress?.emailAddress,
        packageId: pkg.id,
        amount: pkg.price,
        credits: pkg.credits,
      });

      if (response.data.success && response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(
        error.response?.data?.error ||
          'Failed to process payment. Please try again.'
      );
    } finally {
      setLoading(false);
      setProcessingPackageId(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className={`relative ${
            pkg.isPopular ? 'border-blue-500 shadow-lg scale-105' : ''
          }`}
        >
          {pkg.isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
          )}

          <CardHeader>
            <h3 className="text-2xl font-bold text-center">{pkg.name}</h3>
            <div className="text-center">
              <span className="text-4xl font-bold">ZAR{pkg.price}</span>
            </div>
            <p className="text-center text-gray-600">{pkg.credits} Credits</p>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant={pkg.isPopular ? 'default' : 'outline'}
              disabled={loading || !user}
              onClick={() => handleSelectPackage(pkg)}
            >
              {processingPackageId === pkg.id
                ? 'Processing...'
                : user
                  ? 'Select Package'
                  : 'Sign in to Purchase'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CreditPackages;
