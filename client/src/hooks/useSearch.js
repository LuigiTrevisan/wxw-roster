import { useState, useMemo } from 'react';

export const useSearch = ({data}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    
    return safeData.filter(item => 
      item && 
      item.name && 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return { searchQuery, setSearchQuery, filteredData };
};  