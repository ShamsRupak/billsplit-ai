import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Plus, 
  Search, 
  UserPlus,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '../contexts/AuthContext';

interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdBy: string;
  balance: number;
  lastActivity: string;
  category: string;
  imageUrl?: string;
}

const GroupsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        setGroups([
          {
            id: 'grp1',
            name: 'Weekend Trip 2024',
            description: 'Summer vacation with friends',
            memberCount: 5,
            createdBy: 'You',
            balance: 125.50,
            lastActivity: '2 hours ago',
            category: 'trip',
          },
          {
            id: 'grp2',
            name: 'Apartment 4B',
            description: 'Monthly shared expenses',
            memberCount: 3,
            createdBy: 'John',
            balance: -45.00,
            lastActivity: '1 day ago',
            category: 'home',
          },
          {
            id: 'grp3',
            name: 'Office Lunch Group',
            description: 'Daily lunch expenses',
            memberCount: 8,
            createdBy: 'Sarah',
            balance: 0,
            lastActivity: '3 days ago',
            category: 'other',
          },
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      setIsLoading(false);
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trip':
        return '✈️';
      case 'home':
        return '🏠';
      case 'event':
        return '🎉';
      default:
        return '👥';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Groups</h1>
              <p className="text-gray-400 mt-1">Manage your expense groups</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/groups/join')}
                className="border-gray-700 hover:bg-gray-800"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Join Group
              </Button>
              <Button
                variant="gradient"
                onClick={() => navigate('/groups/new')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Groups Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : filteredGroups.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchQuery ? 'No groups found' : 'No groups yet'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Create or join a group to start splitting expenses!'}
              </p>
              {!searchQuery && (
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/groups/join')}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join a Group
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={() => navigate('/groups/new')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="glass-card hover:bg-gray-800/50 transition-all cursor-pointer group"
                onClick={() => navigate(`/groups/${group.id}`)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getCategoryIcon(group.category)}</div>
                      <div>
                        <CardTitle className="text-lg text-white group-hover:text-indigo-400 transition-colors">
                          {group.name}
                        </CardTitle>
                        {group.description && (
                          <p className="text-sm text-gray-400 mt-1">{group.description}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Show group options menu
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Members */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{group.memberCount} members</span>
                    </div>

                    {/* Balance */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Your balance</span>
                      <div className={`flex items-center gap-1 font-semibold ${
                        group.balance > 0 ? 'text-green-400' : 
                        group.balance < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {group.balance > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : group.balance < 0 ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : (
                          <DollarSign className="w-4 h-4" />
                        )}
                        {formatCurrency(group.balance)}
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Active {group.lastActivity}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/groups/${group.id}/expenses/new`);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Expense
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/groups/${group.id}/settle`);
                      }}
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      Settle
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/groups/${group.id}/settings`);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {!isLoading && groups.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{groups.length}</div>
                <p className="text-xs text-gray-400 mt-1">Active groups</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Owed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(
                    groups.reduce((sum, g) => sum + (g.balance > 0 ? g.balance : 0), 0)
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Across all groups</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Owing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">
                  {formatCurrency(
                    groups.reduce((sum, g) => sum + (g.balance < 0 ? Math.abs(g.balance) : 0), 0)
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Across all groups</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;
