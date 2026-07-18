import React from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <div 
      key={location.pathname} 
      className="animate-page-enter w-full min-h-screen"
    >
      {children}
    </div>
  );
};

export default PageTransition;
