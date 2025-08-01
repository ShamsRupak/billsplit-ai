import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Activity, 
  User, 
  LogOut,
  Receipt,
  CreditCard,
  Settings
} from 'lucide-react';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  label: string;
}

const sidebarLinks: NavItem[] = [
  {
    icon: Home,
    route: '/dashboard',
    label: 'Dashboard',
  },
  {
    icon: Users,
    route: '/groups',
    label: 'Groups',
  },
  {
    icon: Users,
    route: '/friends',
    label: 'Friends',
  },
  {
    icon: Receipt,
    route: '/expenses',
    label: 'Expenses',
  },
  {
    icon: Activity,
    route: '/activity',
    label: 'Activity',
  },
  {
    icon: CreditCard,
    route: '/settlements',
    label: 'Settlements',
  },
  {
    icon: User,
    route: '/profile',
    label: 'Profile',
  },
  {
    icon: Settings,
    route: '/settings',
    label: 'Settings',
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 px-4">
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
          <span className="text-white font-bold text-xl">BillSplit.ai</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            const Icon = link.icon;

            return (
              <li key={link.label}>
                <NavLink
                  to={link.route}
                  className={`leftsidebar-link flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Info & Logout */}
      <div className="flex flex-col gap-4">
        {user && (
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs">{user.email}</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="flex items-center gap-4 p-4 text-gray-300 hover:text-white hover:bg-gray-700 w-full justify-start"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
