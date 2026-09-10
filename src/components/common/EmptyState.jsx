import React from 'react';
import Button from './Button';

const EmptyState = ({
  title = 'No products found',
  message = 'We could not find any products matching your request.',
  actionText,
  onAction,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto my-8 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-3xl font-bold">
        🔍
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{message}</p>
      </div>

      {actionText && onAction && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
