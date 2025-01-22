import { useState } from 'react';

export const useSort = (initialData) => {
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [data, setData] = useState(initialData);

  const sortTable = (field) => {
    let direction = 'asc';
    if (sortConfig.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const sortedData = [...data].sort((a, b) => {
      if (field === 'name' || field === 'gender') {
        return direction === 'asc' 
          ? a[field].localeCompare(b[field]) 
          : b[field].localeCompare(a[field]);
      } else if (typeof a[field] === 'boolean') {
        return direction === 'asc' 
          ? (a[field] === b[field] ? 0 : a[field] ? -1 : 1) 
          : (a[field] === b[field] ? 0 : a[field] ? 1 : -1);
      }
      return direction === 'asc' ? a[field] - b[field] : b[field] - a[field];
    });

    setSortConfig({ field, direction });
    setData(sortedData);
  };

  return { sortedData: data, sortConfig, sortTable, setData };
};