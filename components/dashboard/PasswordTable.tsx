/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Eye, EyeOff, Copy, Trash2, Edit, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface PasswordTableProps {
  filteredEntries: Array<{
    _id?: string;
    website: string;
    username: string;
    password: string;
  }>;
  visiblePasswords: { [key: string]: boolean };
  togglePasswordVisibility: (id: string) => void;
  copyToClipboard: (text: string) => void;
  deleteEntry: (id: string) => void;
  saveEntry: (
    id: string,
    editedEntry: { website: string; username: string; password: string }
  ) => Promise<void>;
  handleEditChange: (id: string, field: string, value: string) => void;
}

export default function PasswordTable({
  filteredEntries = [],
  visiblePasswords,
  togglePasswordVisibility,
  copyToClipboard,
  deleteEntry,
  saveEntry,
}: PasswordTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedEntry, setEditedEntry] = useState<{
    website: string;
    username: string;
    password: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = (entry: any) => {
    setEditingId(entry._id);
    setEditedEntry({ ...entry });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedEntry(null);
  };

  const handleSave = async () => {
    if (!editingId || !editedEntry) return;
    setIsSaving(true);
    try {
      await saveEntry(editingId, editedEntry);
      cancelEditing();
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditFieldChange = (field: string, value: string) => {
    setEditedEntry((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-1/4">
                Website
              </th>
              <th className="px-4 py-3 text-left font-semibold w-1/4">
                Username
              </th>
              <th className="px-4 py-3 text-left font-semibold w-1/3">
                Password
              </th>
              <th className="px-4 py-3 text-right font-semibold w-1/6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/60 divide-y divide-gray-200">
            {filteredEntries.map((entry) => (
              <motion.tr
                key={entry._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-indigo-50 rounded-lg"
              >
                <td className="px-4 py-4">
                  {editingId === entry._id ? (
                    <input
                      value={editedEntry?.website || ''}
                      onChange={(e) =>
                        handleEditFieldChange('website', e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
                        {entry.website.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800 truncate max-w-[120px]">
                        {entry.website}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-4 py-4">
                  {editingId === entry._id ? (
                    <input
                      value={editedEntry?.username || ''}
                      onChange={(e) =>
                        handleEditFieldChange('username', e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  ) : (
                    <span className="text-gray-600 truncate max-w-[140px] block">
                      {entry.username}
                    </span>
                  )}
                </td>

                <td className="px-4 py-4">
                  {editingId === entry._id ? (
                    <div className="relative">
                      <input
                        type={
                          visiblePasswords[entry._id ?? '']
                            ? 'text'
                            : 'password'
                        }
                        value={editedEntry?.password || ''}
                        onChange={(e) =>
                          handleEditFieldChange('password', e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md font-mono"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          togglePasswordVisibility(entry._id ?? '')
                        }
                        className="absolute right-3 top-2 text-gray-500"
                      >
                        {visiblePasswords[entry._id ?? ''] ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-6 w-full">
                      <input
                        type={
                          visiblePasswords[entry._id ?? '']
                            ? 'text'
                            : 'password'
                        }
                        value={entry.password}
                        readOnly
                        className="bg-transparent font-mono text-sm w-full truncate"
                      />
                      <button
                        onClick={() =>
                          togglePasswordVisibility(entry._id ?? '')
                        }
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        {visiblePasswords[entry._id ?? ''] ? (
                          <EyeOff size={16} className="cursor-pointer" />
                        ) : (
                          <Eye size={16} className="cursor-pointer" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(entry.password)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <Copy size={16} className="cursor-pointer" />
                      </button>
                    </div>
                  )}
                </td>

                <td className="px-4 py-4 text-right">
                  {editingId === entry._id ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={cancelEditing}
                        disabled={isSaving}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="text-green-500 hover:text-green-700"
                      >
                        {isSaving ? 'Saving...' : <Check size={18} />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => startEditing(entry)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry._id ?? '')}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
