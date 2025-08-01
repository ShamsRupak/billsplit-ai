import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { Skeleton } from '@/components/ui/skeleton';

const GroupsPage: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.groups.list);
        const data = await response.json();
        setGroups(data.groups);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Groups</h1>
        <Button onClick={() => navigate('/groups/new')} variant="gradient">
          <Users className="w-4 h-4 mr-2" />
          New Group
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-24 w-full mb-4" />
      ) : groups.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No groups yet</p>
          <p className="text-gray-500 text-sm mt-1">Create a group to start splitting expenses!</p>
          <Button
            variant="outline"
            className="mt-4 border-gray-700 hover:bg-gray-800"
            onClick={() => navigate('/groups/new')}
          >
            Create Group
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => navigate(`/groups/${group.id}`)}>
              <CardHeader>
                <CardTitle className="text-xl text-white">{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{group.memberCount} members</p>
                <p className="text-sm text-gray-500 mt-1">{group.lastActivity}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsPage;

