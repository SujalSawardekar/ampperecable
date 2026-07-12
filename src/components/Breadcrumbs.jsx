import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="w-full bg-[#cc1111] px-4 sm:px-8 py-3">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center gap-2 text-sm sm:text-base">
        {items.map((item, idx) => (
          <React.Fragment key={`${item.label}-${idx}`}>
            {item.path ? (
              <Link to={item.path} className="text-white font-semibold hover:text-[#f8f8f8] whitespace-nowrap transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white/90 font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && (
              <svg className="w-3 h-3 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
