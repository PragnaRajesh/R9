import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ClientForm, ClientFormData } from './ClientForm';

interface AddClientPageProps {
  onBack: () => void;
}

export default function AddClientPage({ onBack }: AddClientPageProps) {
  const handleSubmit = (data: ClientFormData) => {
    // eslint-disable-next-line no-console
    console.log('addClient submitted', data);
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
          <h1 className="text-2xl font-semibold text-navy-dark">Add Client</h1>
        </div>

        <div className="rounded-xl bg-white shadow-soft p-4 sm:p-6">
          <ClientForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
