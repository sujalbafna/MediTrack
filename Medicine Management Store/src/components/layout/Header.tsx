import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getUserDisplayName } from '../../utils/auth';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Pill className="h-8 w-8" />
          <h1 className="text-2xl font-bold">MediTrack Pro</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-indigo-200 transition-colors">
            Dashboard
          </Link>
          <Link to="/inventory" className="hover:text-indigo-200 transition-colors">
            Inventory
          </Link>
          <Link to="/reports" className="hover:text-indigo-200 transition-colors">
            Reports
          </Link>
          <span className="text-indigo-200">
            {getUserDisplayName(user)}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}