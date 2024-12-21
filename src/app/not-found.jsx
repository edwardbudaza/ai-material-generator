import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      {/* Animated Image */}
      <div className="animate-bounce">
        <Image
          src="/not-found.svg"
          height={300}
          width={300}
          alt="error"
          className="drop-shadow-xl"
        />
      </div>

      {/* Heading */}
      <h2 className="mt-8 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
        Oops! Page Not Found
      </h2>
      <p className="mt-4 text-lg text-gray-400">
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Call to Action */}
      <div className="mt-6">
        <Button
          asChild
          className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:from-indigo-400 hover:to-purple-400"
        >
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>

      {/* Animated Background Element */}
      <div className="absolute -z-10 h-64 w-64 animate-spin-slow rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-30 blur-2xl"></div>
      <div className="absolute bottom-10 -z-10 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 opacity-20 blur-3xl"></div>
    </div>
  );
}
