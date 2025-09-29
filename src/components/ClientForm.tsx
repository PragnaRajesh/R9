import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Save } from 'lucide-react';

export interface ClientFormData {
  clientName: string;
  spoc?: string;
  contactEmail?: string;
  arpu?: string;
  position?: string;
  numberOfPositions?: string;
  additionalInformation?: string;
}

export function ClientForm({ onSubmit }: { onSubmit?: (data: ClientFormData) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload: ClientFormData = data as any;
    if (onSubmit) {
      onSubmit(payload);
    } else {
      // eslint-disable-next-line no-console
      console.log('ClientForm submit', payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="client-name">Client Name</Label>
          <Input id="client-name" name="clientName" required className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="client-spoc">SPOC</Label>
          <Input id="client-spoc" name="spoc" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="client-email">Contact Email</Label>
          <Input id="client-email" name="contactEmail" type="email" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="client-arpu">ARPU</Label>
          <Input id="client-arpu" name="arpu" type="number" min={0} step="0.01" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="client-position">Position</Label>
          <Input id="client-position" name="position" className="h-8 w-full" />
        </div>
        <div>
          <Label htmlFor="client-positions">Number of Positions</Label>
          <Input id="client-positions" name="numberOfPositions" type="number" min={0} className="h-8 w-full" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="client-additional">Additional Information</Label>
          <Textarea id="client-additional" name="additionalInformation" rows={3} className="w-full" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Client
        </Button>
      </div>
    </form>
  );
}
