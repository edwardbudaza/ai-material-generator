'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

function WelcomeBanner() {
  const { user, isLoaded } = useUser();

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white rounded-lg flex items-center gap-4 flex-wrap md:flex-nowrap shadow-md">
      {/* Banner Image */}
      <div className="flex-shrink-0">
        <Image
          src="/work.png"
          width={150}
          height={150}
          alt="Welcome Banner"
          className="rounded-md"
        />
      </div>

      {/* Welcome Text */}
      <div className="flex-1">
        <h2 className="font-bold text-2xl md:text-3xl">
          {isLoaded ? `Hello, ${user?.fullName || 'Guest'}!` : 'Loading...'}
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-100 dark:text-gray-300">
          {isLoaded
            ? "Welcome back! It's a great time to dive into new courses and level up your skills."
            : 'Fetching your details... Hang tight!'}
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
