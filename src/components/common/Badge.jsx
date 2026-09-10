import React from 'react';

const Badge = ({ children, color = 'indigo', size = 'sm', className = '' }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${colorMap[color] || colorMap.indigo} ${sizeMap[size] || sizeMap.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
