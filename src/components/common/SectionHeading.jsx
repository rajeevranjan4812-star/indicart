import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeading = ({
  title,
  subtitle,
  actionText,
  actionLink,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200 ${className}`}>
      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wide text-neutral-500 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="mt-3 md:mt-0 text-xs font-black uppercase tracking-wider text-[#65A30D] hover:text-[#84CC16] inline-flex items-center group transition"
        >
          <span>{actionText}</span>
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
