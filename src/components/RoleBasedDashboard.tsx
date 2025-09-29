import React from 'react';
import { useState, type FormEvent } from 'react';
import type { User } from '../types';
import { SharedDashboard } from './SharedDashboard';
import { ActionKey } from './RoleActionBar';
import { Button } from './ui/button';
import RoleActionBar from './RoleActionBar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Save } from 'lucide-react';
import { CandidateForm } from './CandidateForm';
import { ClientForm } from './ClientForm';
import { RecruiterForm } from './RecruiterForm';
import AddEntitySheet from './ui/AddEntitySheet';

interface RoleBasedDashboardProps {
  user: User;
  onLogout: () => void;
}

export function RoleBasedDashboard({ user }: RoleBasedDashboardProps) {
  const [candidateStatus, setCandidateStatus] = useState('');
  const [activeForm, setActiveForm] = useState<null | 'addCandidate' | 'addClient' | 'addRecruiter' | 'addClosure'>(null);

  const onSubmit = (key: ActionKey) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = key === 'addCandidate' ? { ...data, status: candidateStatus } : data;
    console.log(`${key} submitted`, payload);
  };

  return (
    <div className="space-y-6">
      <RoleActionBar role={user.role} onAction={(k) => setActiveForm(k)} showAddActions />
      <SharedDashboard role={user.role} onAction={(k) => setActiveForm(k)} />
      <AddEntitySheet activeForm={activeForm} onOpenChange={(open) => { if (!open) setActiveForm(null); }} />
    </div>
  );
}

export default RoleBasedDashboard;
