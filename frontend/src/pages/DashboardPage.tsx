import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Users, 
  Receipt, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Activity,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface BalanceSummary {
  totalBalance: number;
  youOwe: number;
  youAreOwed: number;
}

interface RecentExpense {
  id: string;
  description: string;
  amount: number;
  date: string;
  groupName: string;
  paidBy: string;
  yourShare: number;
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
  balance: number;
  lastActivity: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [balanceSummary, setBalanceSummary] = useState<BalanceSummary>({
    totalBalance: 0,
    youOwe: 0,
    youAreOwed: 0
  });
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setBalanceSummary({
        totalBalance: 150,
        youOwe: 50,
        youAreOwed: 200,
      });

      setRecentExpenses([
        {
          id: 'exp1',
          description: 'Dinner at Grill House',
          amount: 100,
          date: '2025-07-28',
          groupName: 'Friends Trip',
          paidBy: 'You',
          yourShare: -25,
        },
        {
          id: 'exp2',
          description: 'Groceries',
          amount: 45,
          date: '2025-07-29',
          groupName: 'Family',
          paidBy: 'John',
          yourShare: 20,
        },
      ]);

      setGroups([
        {
          id: 'grp1',
          name: 'Friends Trip',
          memberCount: 5,
          balance: 75,
          lastActivity: '2 days ago',
        },
        {
          id: 'grp2',
          name: 'Family',
          memberCount: 3,
          balance: -20,
          lastActivity: '1 day ago',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {user?.name || 'User'}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 hover:bg-gray-800"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="gradient"
                onClick={() => navigate('/expenses/new')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Balance
              </CardTitle>
              <Activity className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(balanceSummary.totalBalance)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {balanceSummary.totalBalance >= 0 ? 'You are owed' : 'You owe'}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                You Owe
              </CardTitle>
              <TrendingDown className="w-4 h-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {formatCurrency(balanceSummary.youOwe)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Across all groups
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                You're Owed
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {formatCurrency(balanceSummary.youAreOwed)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                From all friends
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Expenses */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Expenses</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {recentExpenses.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No expenses yet</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Add your first expense to get started!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-gray-700 hover:bg-gray-800"
                    onClick={() => navigate('/expenses/new')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/expenses/${expense.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          expense.yourShare > 0 ? 'bg-red-500/10' : 'bg-green-500/10'
                        }`}>
                          {expense.yourShare > 0 ? (
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{expense.description}</p>
                          <p className="text-gray-400 text-sm">
                            {expense.groupName} • {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          expense.yourShare > 0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {expense.yourShare > 0 ? '-' : '+'}
                          {formatCurrency(expense.yourShare)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          of {formatCurrency(expense.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Groups */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">My Groups</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/groups/new')}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Group
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {groups.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No groups yet</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Create or join a group to start splitting expenses!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-gray-700 hover:bg-gray-800"
                    onClick={() => navigate('/groups/new')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/groups/${group.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{group.name}</p>
                          <p className="text-gray-400 text-sm">
                            {group.memberCount} members • {group.lastActivity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          group.balance > 0 ? 'text-green-400' : 
                          group.balance < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {group.balance > 0 ? '+' : ''}
                          {formatCurrency(group.balance)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {group.balance > 0 ? "you're owed" : 
                           group.balance < 0 ? "you owe" : "settled up"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 h-auto py-4 flex-col"
              onClick={() => navigate('/expenses/scan')}
            >
              <Receipt className="w-6 h-6 mb-2" />
              <span>Scan Receipt</span>
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 h-auto py-4 flex-col"
              onClick={() => navigate('/groups/new')}
            >
              <Users className="w-6 h-6 mb-2" />
              <span>Create Group</span>
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 h-auto py-4 flex-col"
              onClick={() => navigate('/settle-up')}
            >
              <DollarSign className="w-6 h-6 mb-2" />
              <span>Settle Up</span>
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 h-auto py-4 flex-col"
              onClick={() => navigate('/activity')}
            >
              <Activity className="w-6 h-6 mb-2" />
              <span>Activity</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
