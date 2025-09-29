import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Reminder = {
  id: string;
  content: string;
  fromTs: number; // scheduled timestamp (ms epoch)
  toTs: number;   // optional end timestamp (ms epoch)
  recipients: string[]; // email addresses
  createdBy: string; // email
  createdAt: number; // ms epoch
  completed?: boolean;
  completedAt?: number | null;
  repeatDaily?: boolean; // if true or undefined, reminder repeats daily until completed
};

interface RemindersContextValue {
  reminders: Reminder[];
  addReminder: (r: Omit<Reminder, 'id' | 'createdAt'>) => void;
  removeReminder: (id: string) => void;
  replaceAll: (rs: Reminder[]) => void;
  updateReminder: (id: string, patch: Partial<Reminder> | ((r: Reminder) => Reminder)) => void;
}

const RemindersContext = createContext<RemindersContextValue | undefined>(undefined);

const STORAGE_KEY = 'app.reminders';

function loadReminders(): Reminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Reminder[];
  } catch {
    return [];
  }
}

function saveReminders(reminders: Reminder[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch {
    // ignore
  }
}

export function RemindersProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>(() => loadReminders());

  useEffect(() => {
    saveReminders(reminders);
  }, [reminders]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const next = JSON.parse(e.newValue) as Reminder[];
          setReminders(next);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addReminder = useCallback((r: Omit<Reminder, 'id' | 'createdAt'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const next: Reminder = { repeatDaily: true, completed: false, completedAt: null, ...r, id, createdAt: Date.now() };
    setReminders(prev => [next, ...prev]);
  }, []);

  const removeReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  }, []);

  const replaceAll = useCallback((rs: Reminder[]) => {
    setReminders(rs);
  }, []);

  const updateReminder = useCallback((id: string, patch: Partial<Reminder> | ((r: Reminder) => Reminder)) => {
    setReminders(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (typeof patch === 'function') return (patch as (r: Reminder) => Reminder)(r);
      return { ...r, ...patch };
    }));
  }, []);

  const value = useMemo(() => ({ reminders, addReminder, removeReminder, replaceAll, updateReminder }), [reminders, addReminder, removeReminder, replaceAll, updateReminder]);

  return (
    <RemindersContext.Provider value={value}>{children}</RemindersContext.Provider>
  );
}

export function useReminders() {
  const ctx = useContext(RemindersContext);
  if (!ctx) throw new Error('useReminders must be used within RemindersProvider');
  return ctx;
}
