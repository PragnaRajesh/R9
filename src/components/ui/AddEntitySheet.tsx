import React from 'react';
import { CandidateForm } from '../CandidateForm';
import { ClientForm } from '../ClientForm';
import { RecruiterForm } from '../RecruiterForm';
import { Button } from './button';
import { toast } from 'sonner@2.0.3';

export type ActiveForm = 'addCandidate' | 'addClient' | 'addRecruiter' | 'addClosure' | null;

function saveToLocal(key: string, item: any) {
  try {
    const cur = JSON.parse(localStorage.getItem(key) || '[]');
    cur.push(item);
    localStorage.setItem(key, JSON.stringify(cur));
  } catch (e) {
    console.error('saveToLocal error', e);
  }
}

export default function AddEntitySheet({ activeForm, onOpenChange }: { activeForm: ActiveForm; onOpenChange: (open: boolean) => void; }) {
  const closeForm = () => onOpenChange(false);

  const handleCandidate = (data: any) => {
    saveToLocal('candidates', data);
    toast.success('Candidate saved');
    closeForm();
  };

  const handleClient = (data: any) => {
    saveToLocal('clients', data);
    toast.success('Client saved');
    closeForm();
  };

  const handleRecruiter = (data: any) => {
    saveToLocal('recruiters', data);
    toast.success('Recruiter saved');
    closeForm();
  };

  const handleClosure = (data: any) => {
    saveToLocal('closures', data);
    toast.success('Closure saved');
    closeForm();
  };

  return (
    <aside className={`right-panel ${activeForm ? 'right-panel-open' : ''}`} aria-hidden={!activeForm}>
      <div className="right-panel-header p-4 border-b">
        <h3 className="text-lg font-medium text-navy-dark">
          {activeForm === 'addCandidate' && 'Add Candidate'}
          {activeForm === 'addClient' && 'Add Client'}
          {activeForm === 'addRecruiter' && 'Add Recruiter'}
          {activeForm === 'addClosure' && 'Add Closure'}
        </h3>
        <div className="text-sm text-gray-medium">
          {activeForm === 'addCandidate' && 'Enter candidate details below.'}
          {activeForm === 'addClient' && 'Enter client details below.'}
          {activeForm === 'addRecruiter' && 'Enter recruiter details below.'}
          {activeForm === 'addClosure' && 'Enter closure details below.'}
        </div>
        <div className="mt-2 flex justify-end">
          <Button variant="outline" onClick={closeForm}>Close</Button>
        </div>
      </div>

      <div className="right-panel-body p-4 overflow-y-auto">
        {activeForm === 'addCandidate' && (
          <CandidateForm onSubmit={(data) => handleCandidate(data)} />
        )}

        {activeForm === 'addClient' && (
          <ClientForm onSubmit={(data) => handleClient(data)} />
        )}

        {activeForm === 'addRecruiter' && (
          <RecruiterForm onSubmit={(data) => handleRecruiter(data)} />
        )}

        {activeForm === 'addClosure' && (
          <form onSubmit={(e) => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget).entries()); handleClosure(data); }} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm">Candidate Name</label>
                <input name="candidateName" required className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Client</label>
                <input name="client" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Position</label>
                <input name="position" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Date of Joining</label>
                <input name="dateOfJoining" type="date" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Salary</label>
                <input name="salary" type="number" min={0} className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Recruiter</label>
                <input name="recruiter" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Team Lead</label>
                <input name="teamLead" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Manager</label>
                <input name="manager" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">ARPU</label>
                <input name="arpu" type="number" step="0.01" className="mt-1 block w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="text-sm">Notes</label>
                <textarea name="notes" rows={3} className="mt-1 block w-full rounded-md border p-2" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-blue-bright text-white">Save Closure</button>
            </div>
          </form>
        )}
      </div>
    </aside>
  );
}
