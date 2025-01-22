import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const WrestlerRow = ({ wrestler, onEdit, onDelete }) => {
  return (
    <tr className="border-t hover:bg-gray-700">
      <td className="px-4 py-3">{wrestler.name}</td>
      <td className="px-4 py-3 capitalize">{wrestler.gender}</td>
      <td className="px-4 py-3">{wrestler.isChampion ? 'Yes' : 'No'}</td>
      <td className="px-4 py-3">{wrestler.isTagTeam ? 'Yes' : 'No'}</td>
      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={onEdit}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};