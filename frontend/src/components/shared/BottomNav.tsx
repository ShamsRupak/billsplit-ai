import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Receipt, User } from 'lucide-react';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  label: string;
}

const bottomNavLinks: NavItem[] = [
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
    icon: Receipt,
    route: '/expenses',
    label: 'Expenses',
  },
  {
    icon: User,
    route: '/profile',
    label: 'Profile',
  },
];

const BottomNav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottomNavLinks.map((link) => {
        const isActive = pathname === link.route;
        const Icon = link.icon;

        return (
          <NavLink
            key={link.label}
            to={link.route}
            className={`flex-center flex-col gap-1 p-2 transition-colors ${
              isActive 
                ? 'text-indigo-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-500' : ''}`} />
            <p className="tiny-medium">{link.label}</p>
          </NavLink>
        );
      })}
    </section>
  );
};

export default BottomNav;
