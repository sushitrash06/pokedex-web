// context/SearchContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SearchContextProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
