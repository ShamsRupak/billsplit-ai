import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            BillSplit.ai
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Smart expense sharing platform with AI-powered receipt scanning. 
            Split bills effortlessly with friends, family, and colleagues.
          </p>
          
          <div className="space-x-4">
            <Link 
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2">AI Receipt Scanning</h3>
            <p className="text-white/80">Upload receipts and let AI parse items automatically</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Smart Group Management</h3>
            <p className="text-white/80">Create groups for trips, housemates, events</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Flexible Splitting</h3>
            <p className="text-white/80">Equal, percentage, or custom splits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
