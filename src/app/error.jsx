'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error() {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-red-800 via-black to-gray-900 text-gray-200">
      {/* Floating Error Image */}
      <div className="relative animate-float">
        <Image
          src="/error.svg"
          height={300}
          width={300}
          alt="error"
          className="drop-shadow-2xl"
        />
      </div>

      {/* Error Message */}
      <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Something went wrong!
      </h2>
      <p className="mt-4 text-lg text-gray-400">
        Don't worry, we're working on it. Try again later or go back.
      </p>

      {/* Call to Action */}
      <div className="mt-6">
        <Button
          asChild
          className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:from-red-400 hover:to-orange-400"
        >
          <Link href="/">Go Back</Link>
        </Button>
      </div>

      {/* Background Decorations */}
      <div className="absolute -z-10 top-1/4 -right-20 h-72 w-72 animate-spin-slow rounded-full bg-gradient-to-br from-yellow-400 to-red-500 opacity-25 blur-3xl"></div>
      <div className="absolute -z-10 bottom-10 left-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 opacity-20 blur-3xl"></div>
    </div>
  );
}
