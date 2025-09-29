import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Save } from 'lucide-react';

export interface CandidateFormData {
  fullName: string;
  email: string;
  contactNumber?: string;
  position?: string;
  location?: string;
  client?: string;
  status?: string;
  dateOfJoining?: string;
  salary?: string;
  recruiterReporting?: string;
  teamLeadReporting?: string;
  manager?: string;
  arpu?: string;
  additionalInfo?: string;
}

export function CandidateForm({ onSubmit }: { onSubmit?: (data: CandidateFormData) => void }) {
  const [status, setStatus] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload: CandidateFormData = { ...(data as any), status };
    if (onSubmit) {
      onSubmit(payload);
    } else {
      // default behavior
      // eslint-disable-next-line no-console
      console.log('CandidateForm submit', payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="candidate-name">Full Name</Label>
          <Input id="candidate-name" name="fullName" required className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-email">Email</Label>
          <Input id="candidate-email" name="email" type="email" required className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-contact">Contact Number</Label>
          <Input id="candidate-contact" name="contactNumber" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-position">Position</Label>
          <Input id="candidate-position" name="position" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-location">Location</Label>
          <Input id="candidate-location" name="location" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-client">Client</Label>
          <Input id="candidate-client" name="client" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="candidate-status" className="h-8 w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
              <SelectItem value="joined">Joined</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="candidate-doj">Date of Joining</Label>
          <Input id="candidate-doj" name="dateOfJoining" type="date" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-salary">Salary</Label>
          <Input id="candidate-salary" name="salary" type="number" min={0} className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-recruiter">Recruiter Reporting</Label>
          <Input id="candidate-recruiter" name="recruiterReporting" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-lead">Team Lead Reporting</Label>
          <Input id="candidate-lead" name="teamLeadReporting" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-manager">Manager</Label>
          <Input id="candidate-manager" name="manager" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="candidate-arpu">ARPU</Label>
          <Input id="candidate-arpu" name="arpu" type="number" min={0} step="0.01" className="h-8 w-full" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="candidate-additional">Additional Info</Label>
          <Textarea id="candidate-additional" name="additionalInfo" rows={3} className="w-full" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Candidate
        </Button>
      </div>
    </form>
  );
}
