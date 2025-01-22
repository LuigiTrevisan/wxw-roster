import React, { useState } from 'react';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { TableHeader } from './TableHeader';

export const WrestlerDesktopView = ({ wrestlers, onEdit, onDelete, sortConfig, sortTable }) => (
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-900">
          <TableHeader
            label="Name"
            field="name"
            sortConfig={sortConfig}
            onSort={sortTable}
          />
          <TableHeader
            label="Gender"
            field="gender"
            sortConfig={sortConfig}
            onSort={sortTable}
          />
          <TableHeader
            label="Champion"
            field="isChampion"
            sortConfig={sortConfig}
            onSort={sortTable}
          />
          <TableHeader
            label="Tag Team"
            field="isTagTeam"
            sortConfig={sortConfig}
            onSort={sortTable}
          />
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {wrestlers.map((wrestler) => (
          <tr key={wrestler._id} className="border-t hover:bg-gray-700">
            <td className="px-4 py-3">{wrestler.name}</td>
            <td className="px-4 py-3 capitalize">{wrestler.gender}</td>
            <td className="px-4 py-3">{wrestler.isChampion ? 'Yes' : 'No'}</td>
            <td className="px-4 py-3">{wrestler.isTagTeam ? 'Yes' : 'No'}</td>
            <td className="px-4 py-3">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onEdit(wrestler)}
                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(wrestler._id)}
                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const WrestlerMobileView = ({ wrestlers, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="md:hidden space-y-2">
      {wrestlers.map((wrestler) => {
        const isExpanded = expandedId === wrestler._id;

        return (
          <div key={wrestler._id} className="border rounded-lg bg-gray-800">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : wrestler._id)}
            >
              <div className="flex-1">
                <div className="font-medium">{wrestler.name}</div>
                <div className="text-sm text-gray-400 capitalize">{wrestler.gender}</div>
              </div>
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>

            {isExpanded && (
              <div className="px-4 pb-3 space-y-2 border-t border-gray-700">
                <div className="flex justify-between text-sm">
                  <span>Champion:</span>
                  <span>{wrestler.isChampion ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tag Team:</span>
                  <span>{wrestler.isTagTeam ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(wrestler);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(wrestler._id);
                    }}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};