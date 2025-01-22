import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X } from 'lucide-react';

export const WrestlerForm = ({ wrestler, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(wrestler || {
        name: '',
        gender: 'male',
        isChampion: false,
        championshipTitle: '',
        isTagTeam: false,
        image: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSubmit(formData);
        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{wrestler ? 'Edit Wrestler' : 'Add New Wrestler'}</CardTitle>
                    <button onClick={onClose} className="text-gray-200 hover:text-red-500">
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
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
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
                                onClick={onClose}
                                className="px-4 py-2 border rounded-md hover:text-red-500 hover:border-red-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {wrestler ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};