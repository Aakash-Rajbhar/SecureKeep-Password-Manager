'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SearchHeader from '@/components/dashboard/SearchHeader';
import AddEntryForm from '@/components/dashboard/AddEntryForm';
import PasswordTable from '@/components/dashboard/PasswordTable';
import LoadingState from '@/components/dashboard/LoadingState';
import EmptyState from '@/components/dashboard/EmptyState';

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
  const router = useRouter();

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

  const logout = () => {
    document.cookie = 'token=; Max-Age=0';
    router.push('/login');
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
        credentials: 'include', // If using cookies
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update password');
      }

      const updatedEntry = await res.json();

      // Update local state
      setEntries((prev) =>
        prev.map((entry) =>
          entry._id === id ? { ...entry, ...updatedEntry } : entry
        )
      );
    } catch (error) {
      console.error('Update failed:', error);
      // Show error to user
      throw error; // Re-throw to be caught by PasswordTable
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 text-gray-900 p-4 sm:p-8 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-200/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl animate-float-delay"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ddd 1px, transparent 1px),
              linear-gradient(to bottom, #ddd 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        logout={logout}
      />

      <AddEntryForm
        form={form}
        handleFormChange={handleFormChange}
        addPassword={addPassword}
      />

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
  );
}
