'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface TopNavigationBarProps {
  isAuthenticated?: boolean;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const TopNavigationBar = ({
  isAuthenticated = false,
  userName = 'User',
  userEmail = 'user@example.com',
  onLogout,
}: TopNavigationBarProps) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    setIsAccountMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isLoginPage = pathname === '/login';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-warm-md">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={isAuthenticated ? '/document-upload' : '/login'}
            className="flex items-center space-x-2 transition-all duration-250 ease-out hover:-translate-y-px focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 rounded-md"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <span className="text-primary-foreground font-heading font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">Zaprint</span>
          </Link>

          {isAuthenticated && !isLoginPage && (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative" ref={accountMenuRef}>
                  <button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                    aria-expanded={isAccountMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full font-caption font-medium">
                      {getInitials(userName)}
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground">{userName}</span>
                      <span className="text-xs text-muted-foreground">{userEmail}</span>
                    </div>
                    <Icon
                      name="ChevronDownIcon"
                      size={20}
                      className={`text-muted-foreground transition-transform duration-250 ${
                        isAccountMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isAccountMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-popover rounded-xl shadow-warm-lg overflow-hidden z-[1010]">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                        <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/user-dashboard"
                          className="flex items-center space-x-3 px-4 py-3 transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          <Icon name="HomeIcon" size={20} className="text-muted-foreground" />
                          <span className="text-sm text-popover-foreground">Dashboard</span>
                        </Link>
                        <Link
                          href="/order-tracking"
                          className="flex items-center space-x-3 px-4 py-3 transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          <Icon name="ClipboardDocumentListIcon" size={20} className="text-muted-foreground" />
                          <span className="text-sm text-popover-foreground">My Orders</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted text-left"
                        >
                          <Icon name="ArrowRightOnRectangleIcon" size={20} className="text-muted-foreground" />
                          <span className="text-sm text-popover-foreground">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} className="text-foreground" />
              </button>
            </>
          )}
        </div>

        {isAuthenticated && !isLoginPage && isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-3 px-4 py-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-caption font-medium">
                {getInitials(userName)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{userName}</span>
                <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                href="/user-dashboard"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="HomeIcon" size={24} className="text-muted-foreground" />
                <span className="text-base text-foreground">Dashboard</span>
              </Link>
              <Link
                href="/order-tracking"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="ClipboardDocumentListIcon" size={24} className="text-muted-foreground" />
                <span className="text-base text-foreground">My Orders</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted text-left"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={24} className="text-muted-foreground" />
                <span className="text-base text-foreground">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigationBar;