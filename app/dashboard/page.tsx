'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import AddEntryForm from '@/components/dashboard/AddEntryForm';
import PasswordTable from '@/components/dashboard/PasswordTable';
// import LoadingState from '@/components/dashboard/LoadingState';
import EmptyState from '@/components/dashboard/EmptyState';
import Header from '@/components/dashboard/Header';
import SearchBar from '@/components/dashboard/SearchBar';
import PasswordTableSkeleton from '@/components/dashboard/PasswordTableSkeleton';

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
  const [decryptingPasswords, setDecryptingPasswords] = useState<string[]>([]);
  const [decryptedPasswords, setDecryptedPasswords] = useState<{
    [key: string]: string;
  }>({});
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
        const res = await fetch('/api/passwords?_=${Date.now()}');
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

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/passwords?_=${Date.now()}');
      if (!res.ok) throw new Error('Failed to fetch passwords');
      const data = await res.json();
      setEntries(data.map((entry: Entry) => ({ ...entry, isEditing: false })));
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = async (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));

    if (!decryptedPasswords[id]) {
      try {
        setDecryptingPasswords((prev) => [...prev, id]);
        const res = await fetch(`/api/passwords/${id}/decrypt`, {
          method: 'POST',
          credentials: 'include',
        });
        const data = await res.json();
        setDecryptedPasswords((prev) => ({ ...prev, [id]: data.password }));
      } catch (error) {
        console.error('Failed to decrypt password', error);
      } finally {
        setDecryptingPasswords((prev) => prev.filter((pid) => pid !== id));
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      await fetchEntries(); // Refresh entries
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
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
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
        body: JSON.stringify(updatedData),
        credentials: 'include',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update password');
      }

      // 🧠 1. Clear any old decrypted password
      setDecryptedPasswords((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      // 🧠 2. Hide password after update
      setVisiblePasswords((prev) => ({
        ...prev,
        [id]: false,
      }));

      // 🧠 3. Refresh the list
      await fetchEntries();
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  const exportToCSV = async () => {
    if (!confirm('This will export all passwords in plain text. Continue?'))
      return;

    const decryptedMap: { [key: string]: string } = {};

    for (const entry of entries) {
      const id = entry._id!;
      if (decryptedPasswords[id]) {
        decryptedMap[id] = decryptedPasswords[id];
      } else {
        try {
          const res = await fetch(`/api/passwords/${id}/decrypt`, {
            method: 'POST',
            credentials: 'include',
          });
          const data = await res.json();
          decryptedMap[id] = data.password;
        } catch {
          console.error(`Failed to decrypt ${id}`);
          decryptedMap[id] = 'DECRYPTION_FAILED';
        }
      }
    }

    const headers = ['Website', 'Username', 'Password'];
    const csvRows = [
      headers.join(','),
      ...entries.map(
        (entry) =>
          `"${entry.website}","${entry.username}","${
            decryptedMap[entry._id!] || 'UNKNOWN'
          }"`
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'passwords_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 px-4 sm:px-6 lg:px-8 py-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <Header />

        <div className="mb-8">
          <AddEntryForm
            form={form}
            handleFormChange={handleFormChange}
            addPassword={addPassword}
          />
        </div>

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

          <div className="w-full sm:w-auto flex sm:flex-col gap-4 sm:gap-2 items-end">
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <PasswordTableSkeleton />
          ) : filteredEntries.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <PasswordTable
              filteredEntries={filteredEntries}
              visiblePasswords={visiblePasswords}
              decryptedPasswords={decryptedPasswords}
              decryptingPasswords={decryptingPasswords}
              togglePasswordVisibility={togglePasswordVisibility}
              copyToClipboard={copyToClipboard}
              deleteEntry={deleteEntry}
              saveEntry={saveEntry}
              fetchEntries={fetchEntries}
            />
          )}
        </div>
      </div>
    </div>
  );
}
