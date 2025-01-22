import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TableHeader } from './AdminPage/TableHeader';
import { SearchBar } from './AdminPage/SearchBar';
import { WrestlerRow  } from './AdminPage/WrestlerRow';
import { WrestlerForm } from './AdminPage/WrestlerForm';
import { useWrestlers } from '../hooks/useWrestlers';
import { useSort } from '../hooks/useSort';
import { useSearch } from '../hooks/useSearch';

export const WrestlerAdmin = () => {
  const {
    wrestlers,
    loading,
    error,
    notification,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useWrestlers();
  const { sortedData, sortConfig, sortTable, setData } = useSort(wrestlers);
  const { searchQuery, setSearchQuery, filteredData } = useSearch(sortedData);
  const [showForm, setShowForm] = useState(false);
  const [currentWrestler, setCurrentWrestler] = useState(null);

  useEffect(() => {
    setData(wrestlers);
  }, [wrestlers, setData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-8">
            <div className="text-center">Loading wrestlers...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Roster Management</CardTitle>
          <button
            onClick={() => {
              setCurrentWrestler(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add Wrestler
          </button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {notification && (
            <Alert
              className="mb-4"
              variant={notification.type === 'success' ? 'default' : 'destructive'}
            >
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {showForm && (
            <WrestlerForm
              wrestler={currentWrestler}
              onSubmit={currentWrestler
                ? (data) => handleUpdate(currentWrestler._id, data)
                : handleCreate
              }
              onClose={() => {
                setShowForm(false);
                setCurrentWrestler(null);
              }}
            />
          )}

          <div className="overflow-x-auto">
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
                {filteredData.map((wrestler) => (
                  <WrestlerRow
                    key={wrestler._id}
                    wrestler={wrestler}
                    onEdit={() => {
                      setCurrentWrestler(wrestler);
                      setShowForm(true);
                    }}
                    onDelete={() => handleDelete(wrestler._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};