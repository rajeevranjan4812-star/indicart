import React from 'react';
import Button from './Button';

const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'Failed to load data from server. Please check your network connection.',
  onRetry,
}) => {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-xl mx-auto my-8 space-y-4">
      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
        ⚠️
      </div>
      <div>
        <h3 className="text-lg font-bold text-rose-900">{title}</h3>
        <p className="text-sm text-rose-700 mt-1">{message}</p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <Button variant="danger" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
