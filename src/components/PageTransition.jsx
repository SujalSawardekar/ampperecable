import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Trigger loading bar animation whenever path changes
    setLoading(true);
    setWidth(10);
    
    const t1 = setTimeout(() => setWidth(35), 80);
    const t2 = setTimeout(() => setWidth(75), 200);
    const t3 = setTimeout(() => {
      setWidth(100);
      setTimeout(() => {
        setLoading(false);
        setWidth(0);
      }, 250);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="relative w-full min-h-screen">
      {/* Premium Top Progress Loading Bar */}
      {loading && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '3px',
            backgroundColor: '#C62828', // Amppere Brand Red
            zIndex: 999999,
            width: `${width}%`,
            transition: 'width 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-in-out',
            boxShadow: '0 0 10px rgba(198, 40, 40, 0.7)',
            pointerEvents: 'none',
          }}
        />
      )}
      
      {/* Page Enter Transition Wrapper */}
      <div className="animate-page-enter w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
