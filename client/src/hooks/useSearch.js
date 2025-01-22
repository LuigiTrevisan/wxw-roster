import { useState, useMemo } from 'react';

export const useSearch = (data) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => 
    data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [data, searchQuery]
  );

  return { searchQuery, setSearchQuery, filteredData };
};