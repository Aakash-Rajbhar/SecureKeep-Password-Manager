'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import AddEntryForm from '@/components/dashboard/AddEntryForm';
import PasswordTable from '@/components/dashboard/PasswordTable';
import LoadingState from '@/components/dashboard/LoadingState';
import EmptyState from '@/components/dashboard/EmptyState';
import Header from '@/components/dashboard/Header';
import SearchBar from '@/components/dashboard/SearchBar';

interface Entry {
  _id?: string;
  website: string;
  username: string;
  password: string;
  showPassword?: boolean;
  isEditing?: boolean;
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const [form, setForm] = useState<Entry>({
    website: '',
    username: '',
    password: '',
    showPassword: false,
  });

  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) return entries;
    const term = searchTerm.toLowerCase();
    return entries.filter(
      (entry) =>
        entry.website.toLowerCase().includes(term) ||
        entry.username.toLowerCase().includes(term)
    );
  }, [entries, searchTerm]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch('/api/passwords');
        if (!res.ok) throw new Error('Failed to fetch passwords');
        const data = await res.json();
        setEntries(
          data.map((entry: Entry) => ({ ...entry, isEditing: false }))
        );
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (id: string, field: string, value: string) => {
    setEntries(
      entries.map((entry) =>
        entry._id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/passwords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to save');
      const newEntry = await res.json();
      setEntries([{ ...newEntry, isEditing: false }, ...entries]);
      setForm({ website: '', username: '', password: '', showPassword: false });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save');
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const res = await fetch(`/api/passwords/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete');
    }
  };

  const saveEntry = async (id: string, updatedData: Partial<Entry>) => {
    try {
      const entryToUpdate = entries.find((entry) => entry._id === id);
      if (!entryToUpdate) return;

      const res = await fetch(`/api/passwords/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: updatedData.website,
          username: updatedData.username,
          password: updatedData.password,
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update password');
      }

      const updatedEntry = await res.json();

      setEntries((prev) =>
        prev.map((entry) =>
          entry._id === id ? { ...entry, ...updatedEntry } : entry
        )
      );
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  const exportToCSV = () => {
    if (!confirm('This will export all passwords in plain text. Continue?')) {
      return;
    }
    // Create CSV content
    const headers = ['Website', 'Username', 'Password'];
    const csvRows = [
      headers.join(','), // Header row
      ...entries.map(
        (entry) => `"${entry.website}","${entry.username}","${entry.password}"`
      ),
    ];

    const csvContent = csvRows.join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'passwords_export.csv');
    link.style.visibility = 'hidden';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 px-4 sm:px-6 lg:px-8 py-6">
      {/* Modern subtle grid background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
      </div>

      {/* Main content container with max-width */}
      <div className="max-w-6xl mx-auto relative">
        <Header />

        {/* Add entry form section */}
        <div className="mb-8">
          <AddEntryForm
            form={form}
            handleFormChange={handleFormChange}
            addPassword={addPassword}
          />
        </div>

        {/* Search and export section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <div className="w-full sm:w-auto">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Search passwords
            </h2>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              className="w-full sm:w-80"
            />
          </div>

          <div className="w-full sm:w-auto flex sm:flex-col gap-4 items-end">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Export data
            </p>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#16A34A] hover:border-[#16A34A] transition-colors text-white text-sm font-medium shadow-xs hover:shadow-sm cursor-pointer"
              title="Export all passwords as CSV file."
              aria-label="Export passwords to CSV"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export CSV
            </button>
          </div>
        </motion.div>

        {/* Content area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <LoadingState />
          ) : filteredEntries.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <PasswordTable
              filteredEntries={filteredEntries}
              visiblePasswords={visiblePasswords}
              togglePasswordVisibility={togglePasswordVisibility}
              copyToClipboard={copyToClipboard}
              deleteEntry={deleteEntry}
              saveEntry={saveEntry}
              handleEditChange={handleEditChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
