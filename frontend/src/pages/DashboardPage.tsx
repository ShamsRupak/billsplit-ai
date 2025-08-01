import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Add Expense
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-green-600">$0.00</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">You Owe</h3>
            <p className="text-3xl font-bold text-red-600">$0.00</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">You're Owed</h3>
            <p className="text-3xl font-bold text-blue-600">$0.00</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center">No expenses yet. Add your first expense to get started!</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Groups</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center">No groups yet. Create or join a group to start splitting expenses!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
