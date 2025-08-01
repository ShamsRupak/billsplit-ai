import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Topbar from '@/components/shared/Topbar';
import Bottombar from '@/components/shared/Bottombar';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex h-screen bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
            <LeftSidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        <Topbar 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 mt-16 overflow-y-auto">
          <div className="pb-20 lg:pb-0">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <Bottombar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
