import React from 'react';

export const TableHeader = ({ label, field, sortConfig, onSort }) => (
  <th onClick={() => onSort(field)} className="px-4 py-3 text-left cursor-pointer">
    <div className="flex items-center gap-2">
      <span>{label}</span>
      <span className="w-4 inline-block">
        {sortConfig.field === field && (sortConfig.direction === 'asc' ? '↑' : '↓')}
      </span>
    </div>
  </th>
);