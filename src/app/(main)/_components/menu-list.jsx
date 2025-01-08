import { LayoutDashboard, DollarSign, UserCircle } from 'lucide-react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MenuList({ onClick = () => {} }) {
  const path = usePathname();
  const MenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Credits', icon: DollarSign, path: '/dashboard/credits' }, // Changed icon for better representation
    //{ name: 'Profile', icon: UserCircle, path: '/dashboard/profile' },
  ];

  return (
    <nav className="mt-6 space-y-2">
      {MenuItems.map((menu) => (
        <Link
          key={menu.name}
          href={menu.path}
          onClick={onClick}
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
            path === menu.path
              ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-md shadow-purple-500/20'
              : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
          )}
        >
          <menu.icon className="w-5 h-5" />
          <span className="font-medium">{menu.name}</span>
        </Link>
      ))}
    </nav>
  );
}
