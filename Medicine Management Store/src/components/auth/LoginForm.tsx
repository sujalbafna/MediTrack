import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { LoadingStates, type LoadingState } from '../../utils/loading';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginState, setLoginState] = useState<LoadingState>(LoadingStates.IDLE);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginState(LoadingStates.LOADING);

    try {
      await login(email, password);
      setLoginState(LoadingStates.SUCCESS);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
      setLoginState(LoadingStates.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://i.postimg.cc/3NsJ0Qxb/Medi-Track-Pro-logo-with-the-name-Ther-1.jpg"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            alt="Logo"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login to MediTrack Pro</h2>
        {error && <ErrorMessage message={error} className="mb-4" />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loginState === LoadingStates.LOADING}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loginState === LoadingStates.LOADING}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loginState === LoadingStates.LOADING}
          >
            {loginState === LoadingStates.LOADING ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" />
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
          <div className="text-center text-sm text-gray-600">
            <p>Developed & Hosted By Sujal Bafna</p>
            <p>Email Id - bafna3249@gmail.com</p>
          </div>
        </form>
      </div>
    </div>
  );
}