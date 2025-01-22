import React, { useEffect, useState } from 'react';
import { PlusCircle, Pencil, Trash2, Search, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getAllWrestlers, createWrestler, updateWrestler, deleteWrestler, uploadFile, deleteFile } from '../api/wrestlers';

export const WrestlerAdmin = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentWrestler, setCurrentWrestler] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    isChampion: false,
    championshipTitle: '',
    isTagTeam: false,
    image: ''
  });

  useEffect(() => {
    fetchWrestlers();
  }, []);

  const fetchWrestlers = async () => {
    try {
      setLoading(true);
      const response = await getAllWrestlers();
      setWrestlers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch wrestlers. Please try again later.');
      setNotification({ type: 'destructive', message: 'Failed to fetch wrestlers.' });
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentWrestler) {
        await updateWrestler(currentWrestler._id, formData);
        setNotification({ type: 'success', message: 'Wrestler updated successfully!' });
      } else {
        await createWrestler(formData);
        setNotification({ type: 'success', message: 'Wrestler created successfully!' });
      }
      fetchWrestlers();
      setShowForm(false);
      setCurrentWrestler(null);
      resetForm();
    } catch (err) {
      setNotification({ 
        type: 'destructive', 
        message: `Failed to ${currentWrestler ? 'update' : 'create'} wrestler.` 
      });
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wrestlerToDelete, setWrestlerToDelete] = useState(null);

  const handleDelete = (id) => {
    setWrestlerToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFile(wrestlers.find(wrestler => wrestler._id === wrestlerToDelete).image);
      await deleteWrestler(wrestlerToDelete);
      await fetchWrestlers();
      setNotification({ type: 'success', message: 'Wrestler deleted successfully!' });
    } catch (err) {
      setNotification({ type: 'destructive', message: 'Failed to delete wrestler.' });
    } finally {
      setShowDeleteConfirm(false);
      setWrestlerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setWrestlerToDelete(null);
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileToUpload, setFileToUpload] = useState({
    file: null,
    name: '',
    preview: ''
  })

  const handleUpload = (e) => {
    setShowUploadModal(true);
  };

  const cancelUpload = () => {
    setShowUploadModal(false);
    setFileToUpload({
      file: null,
      name: '',
      preview: ''
    });
  }

  const confirmUpload = () => {
    if (fileToUpload.file && fileToUpload.name) {
      uploadFile(fileToUpload.file, fileToUpload.name)
        .then((response) => {
          setFormData({ ...formData, image: response.data });
          alert(`File "${fileToUpload.name}" uploaded successfully!`);
        })
        .catch((err) => {
          alert('Failed to upload file. Please try again later.');
        })
        .finally(() => {
          cancelUpload();
        });
    } else {
      alert('Please select a file and enter a name.');
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      gender: 'male',
      isChampion: false,
      championshipTitle: '',
      isTagTeam: false,
      image: ''
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, [notification]);

  const filteredWrestlers = wrestlers.filter(wrestler =>
    wrestler.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

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
              setShowForm(true);
              setCurrentWrestler(null);
              resetForm();
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
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search wrestlers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>

          {/* Notification */}
          {notification && (
            <Alert className="mb-4" variant={notification.type === 'success' ? 'default' : 'destructive'}>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Confirm Delete</CardTitle>
                  <button onClick={cancelDelete} className="text-gray-200 hover:text-red-500 hover:border-red-500">
                    <X className="w-5 h-5" />
                  </button>
                </CardHeader>
                <CardContent>
                  <p>Are you sure you want to delete this wrestler?</p>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={cancelDelete}
                      className="px-4 py-2 border rounded-md hover:text-red-500 hover:border-red-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4">
              <Card className="w-full max-w-md relative">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upload Image</CardTitle>
                  <button
                    onClick={cancelUpload}
                    className="text-gray-200 hover:text-red-500 hover:border-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </CardHeader>
                <CardContent>
                  {/* File Input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Image</label>
                    <input
                      type="file"
                      accept='image/*'
                      onChange={(e) => setFileToUpload({
                          file: e.target.files[0],
                          preview: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : '',
                          name: e.target.files[0] ? e.target.files[0].name : ''
                        })
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  {/* Preview */}
                  {fileToUpload.preview && (
                    <div className="mt-4 flex items-center gap-4">
                      <img
                        src={fileToUpload.preview}
                        alt="Wrestler Preview"
                        className="w-32 h-auto rounded-md border border-white"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => {
                        if (fileToUpload.file && fileToUpload.name) {
                          confirmUpload();
                        } else {
                          alert('Please select a file and enter a name.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Form Modal */}
                {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4">
                  <Card className="w-full max-w-xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{currentWrestler ? 'Edit Wrestler' : 'Add New Wrestler'}</CardTitle>
                    <button onClick={() => setShowForm(false)} className="text-gray-200 hover:text-red-500 hover:border-red-500">
                    <X className="w-5 h-5" />
                    </button>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isChampion}
                        onChange={(e) => setFormData({ ...formData, isChampion: e.target.checked })}
                      />
                      Champion
                      </label>
                      <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isTagTeam}
                        onChange={(e) => setFormData({ ...formData, isTagTeam: e.target.checked })}
                      />
                      Tag Team
                      </label>
                    </div>

                    {formData.isChampion && (
                      <div>
                      <label className="block text-sm font-medium mb-1">Championship Title</label>
                      <input
                        type="text"
                        value={formData.championshipTitle}
                        onChange={(e) => setFormData({ ...formData, championshipTitle: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-1">Image URL</label>
                      <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          e.preventDefault(); // Prevent any default browser behavior
                          setFormData({ ...formData, image: e.target.value });
                        }}
                        onPaste={(e) => {
                          e.preventDefault(); // Prevent default paste behavior
                          const text = e.clipboardData.getData('text');
                          setFormData({ ...formData, image: text });
                        }}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                      <button
                        type="button"
                        className="py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                      </div>
                    </div>

                    {formData.image && (
                      <div className="mt-4 flex items-center gap-4">
                      <img
                        src={formData.image}
                        alt="Wrestler Preview"
                        className="w-32 h-auto rounded-md border border-white"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      </div>
                    )}

                    <div className="flex justify-end gap-4 mt-6">
                      <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border rounded-md hover:text-red-500 hover:border-red-500"
                      >
                      Cancel
                      </button>
                      <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                      {currentWrestler ? 'Update' : 'Create'}
                      </button>
                    </div>
                    </form>
                  </CardContent>
                  </Card>
                </div>
                )}

                {/* Wrestlers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Gender</th>
                  <th className="px-4 py-3 text-left">Champion</th>
                  <th className="px-4 py-3 text-left">Tag Team</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWrestlers.map((wrestler) => (
                  <tr key={wrestler._id} className="border-t hover:bg-gray-700">
                    <td className="px-4 py-3">{wrestler.name}</td>
                    <td className="px-4 py-3 capitalize">{wrestler.gender}</td>
                    <td className="px-4 py-3">{wrestler.isChampion ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">{wrestler.isTagTeam ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setCurrentWrestler(wrestler);
                            setFormData(wrestler);
                            setShowForm(true);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(wrestler._id)}
                          className="p-1 text-red-600 hover:text-red-800"
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
        </CardContent>
      </Card>
    </div>
  );
};