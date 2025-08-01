import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Search, Bell, Plus } from 'lucide-react';

const Topbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        {/* Mobile Logo */}
        <Link to="/dashboard" className="flex gap-3 items-center md:hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-lg">BillSplit.ai</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search expenses, groups, friends..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          {/* Add Expense Button */}
          <Button
            variant="gradient"
            size="sm"
            className="hidden sm:flex"
            asChild
          >
            <Link to="/expenses/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Link>
          </Button>

          {/* Mobile Add Button */}
          <Button
            variant="gradient"
            size="icon"
            className="sm:hidden"
            asChild
          >
            <Link to="/expenses/add">
              <Plus className="w-4 h-4" />
            </Link>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          {/* User Avatar */}
          {user && (
            <Link to="/profile" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block text-white font-medium">
                {user.name}
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
