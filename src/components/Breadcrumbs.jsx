import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items = [], isDarkTheme = false }) => {
  return (
    <div className="w-full px-4 sm:px-8 py-2.5">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        {items.map((item, idx) => (
          <React.Fragment key={`${item.label}-${idx}`}>
            {item.path ? (
              <Link 
                to={item.path} 
                className={`flex items-center gap-1.5 font-semibold transition-colors whitespace-nowrap ${
                  isDarkTheme ? 'text-gray-400 hover:text-red-400' : 'text-neutral-500 hover:text-red-600'
                }`}
              >
                {idx === 0 && (
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className={`font-bold whitespace-nowrap ${
                isDarkTheme ? 'text-white' : 'text-neutral-800'
              }`}>
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && (
              <svg className={`w-3 h-3 flex-shrink-0 ${isDarkTheme ? 'text-gray-600' : 'text-neutral-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
