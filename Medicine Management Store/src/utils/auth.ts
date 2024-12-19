import { User } from 'firebase/auth';

export const isAuthenticated = (user: User | null): boolean => {
  return user !== null;
};

export const getUserDisplayName = (user: User | null): string => {
  return user?.displayName || user?.email?.split('@')[0] || 'User';
};