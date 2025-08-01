import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Receipt, Activity, UserCircle } from 'lucide-react';

const Bottombar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/groups', label: 'Groups', icon: Users },
    { path: '/expenses', label: 'Expenses', icon: Receipt },
    { path: '/activity', label: 'Activity', icon: Activity },
    { path: '/profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 z-30">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                isActive
                  ? 'text-indigo-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Bottombar;
