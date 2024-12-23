'use client';

import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from '../../../components/global/mode-toggle';
import Link from 'next/link';

function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        <Link href={'/dashboard'}>Dashboard</Link>
      </h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
}

export default DashboardHeader;
