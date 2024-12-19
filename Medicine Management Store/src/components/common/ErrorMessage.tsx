import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`bg-red-50 text-red-800 p-3 rounded-md ${className}`}>
      {message}
    </div>
  );
}