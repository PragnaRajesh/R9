import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Save } from 'lucide-react';

export interface RecruiterFormData {
  fullName: string;
  email: string;
  contactNumber?: string;
  role?: string;
  team?: string;
  joiningDate?: string;
  experienceYears?: string;
  location?: string;
  notes?: string;
}

export function RecruiterForm({ onSubmit }: { onSubmit?: (data: RecruiterFormData) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload: RecruiterFormData = data as any;
    if (onSubmit) {
      onSubmit(payload);
    } else {
      // eslint-disable-next-line no-console
      console.log('RecruiterForm submit', payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <Label htmlFor="recruiter-name">Full Name</Label>
          <Input id="recruiter-name" name="fullName" required className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-email">Email</Label>
          <Input id="recruiter-email" name="email" type="email" required className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-contact">Contact Number</Label>
          <Input id="recruiter-contact" name="contactNumber" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-role">Role</Label>
          <Input id="recruiter-role" name="role" placeholder="Recruiter / Senior Recruiter / Team Lead" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-team">Team</Label>
          <Input id="recruiter-team" name="team" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-joining">Joining Date</Label>
          <Input id="recruiter-joining" name="joiningDate" type="date" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-exp">Experience (years)</Label>
          <Input id="recruiter-exp" name="experienceYears" type="number" min={0} step="0.1" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="recruiter-location">Location</Label>
          <Input id="recruiter-location" name="location" className="h-8 w-full" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="recruiter-notes">Notes</Label>
          <Textarea id="recruiter-notes" name="notes" rows={3} className="w-full" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Recruiter
        </Button>
      </div>
    </form>
  );
}
