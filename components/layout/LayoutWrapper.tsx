'use client';

import { useEffect, useState } from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Listen for sidebar state changes
    const checkSidebarState = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        setIsCollapsed(JSON.parse(savedState));
      }
    };

    checkSidebarState();

    // Listen for storage changes (when sidebar is toggled)
    window.addEventListener('storage', checkSidebarState);

    // Custom event for same-window updates
    const handleSidebarToggle = () => checkSidebarState();
    window.addEventListener('sidebarToggle', handleSidebarToggle);

    return () => {
      window.removeEventListener('storage', checkSidebarState);
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
    };
  }, []);

  return (
    <main
      className={`flex-1 relative z-10 transition-all duration-300 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-80'
      } ml-0`}
    >
      {children}
    </main>
  );
}
