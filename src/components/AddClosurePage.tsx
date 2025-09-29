import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Save, ArrowLeft } from 'lucide-react';

interface AddClosurePageProps {
  onBack: () => void;
}

export default function AddClosurePage({ onBack }: AddClosurePageProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log('addClosure submitted', data);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="outline" onClick={onBack} className="h-8 px-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-navy-dark">Add Closure</h1>
        </div>

        <div className="rounded-xl bg-white shadow-soft p-4 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor="closure-candidate">Candidate Name</Label>
                <Input id="closure-candidate" name="candidateName" required className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-client">Client</Label>
                <Input id="closure-client" name="client" className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-position">Position</Label>
                <Input id="closure-position" name="position" className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-doj">Date of Joining</Label>
                <Input id="closure-doj" name="dateOfJoining" type="date" className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-salary">Salary</Label>
                <Input id="closure-salary" name="salary" type="number" min={0} className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-recruiter">Recruiter</Label>
                <Input id="closure-recruiter" name="recruiter" className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-lead">Team Lead</Label>
                <Input id="closure-lead" name="teamLead" className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-manager">Manager</Label>
                <Input id="closure-manager" name="manager" className="h-8 w-full" />
              </div>
              <div>
                <Label htmlFor="closure-arpu">ARPU</Label>
                <Input id="closure-arpu" name="arpu" type="number" min={0} step="0.01" className="h-8 w-full" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="closure-notes">Notes</Label>
                <Textarea id="closure-notes" name="notes" rows={3} className="w-full" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onBack}>Cancel</Button>
              <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Closure
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
