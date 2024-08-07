"use client"
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to log out');
      }
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
          <div className='flex items-center gap-2'>
            <Button variant="default" size={'sm'} onClick={handleLogout}>
              Logout
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
