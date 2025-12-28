'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface AccountDropdownMenuProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  triggerClassName?: string;
}

const AccountDropdownMenu = ({
  userName = 'User',
  userEmail = 'user@example.com',
  onLogout,
  triggerClassName = '',
}: AccountDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${triggerClassName}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Account menu"
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
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover rounded-xl shadow-warm-lg overflow-hidden z-[1010]">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-popover-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <div className="py-2">
            <Link
              href="/order-tracking"
              className="flex items-center space-x-3 px-4 py-3 transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:bg-muted"
              onClick={() => setIsOpen(false)}
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
  );
};

export default AccountDropdownMenu;