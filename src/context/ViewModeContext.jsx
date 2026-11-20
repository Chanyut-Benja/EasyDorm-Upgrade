import React, { createContext, useContext, useEffect, useState } from 'react';

const ViewModeContext = createContext({
  isDesktop: false,
  isWideScreen: false,
  viewMode: 'desktop',
  setViewMode: () => {},
  toggleViewMode: () => {},
});

export function ViewModeProvider({ children }) {
  const [isWideScreen, setIsWideScreen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  // Only applies when isWideScreen is true (>= 768px)
  const [viewMode, setViewMode] = useState('desktop');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e) => {
      setIsWideScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDesktop = isWideScreen && viewMode === 'desktop';

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'desktop' ? 'mobile' : 'desktop'));
  };

  return (
    <ViewModeContext.Provider
      value={{
        isDesktop,
        isWideScreen,
        viewMode,
        setViewMode,
        toggleViewMode,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
