import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Sidebar from '@/components/shared/Sidebar';
import Topbar from '@/components/shared/Topbar';
import BottomNav from '@/components/shared/BottomNav';

const RootLayout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <div className="w-full md:flex">
          <Sidebar />
          <section className="flex flex-1 h-full">
            <div className="common-container">
              <div className="user-container">
                <Topbar />
                <Outlet />
              </div>
            </div>
          </section>
          <BottomNav />
        </div>
      )}
    </>
  );
};

export default RootLayout;
