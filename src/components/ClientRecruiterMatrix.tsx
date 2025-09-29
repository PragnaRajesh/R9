import React from 'react';
import { Card } from './ui/card';

interface MatrixProps {
  title?: string;
}

// Using sample data aligned with CandidateTable mock data
const clients = ['TechCorp', 'Global Inc', 'Startup X'];
const recruiters = ['Sarah Chen', 'Mike Johnson', 'Lisa Wong', 'David Kumar'];

const counts: Record<string, Record<string, number>> = {
  'TechCorp': {
    'Sarah Chen': 1,
    'Mike Johnson': 0,
    'Lisa Wong': 0,
    'David Kumar': 1,
  },
  'Global Inc': {
    'Sarah Chen': 1,
    'Mike Johnson': 1,
    'Lisa Wong': 0,
    'David Kumar': 0,
  },
  'Startup X': {
    'Sarah Chen': 0,
    'Mike Johnson': 0,
    'Lisa Wong': 1,
    'David Kumar': 0,
  },
};

function rowTotal(client: string) {
  return recruiters.reduce((sum, rec) => sum + (counts[client]?.[rec] || 0), 0);
}

function colTotal(recruiter: string) {
  return clients.reduce((sum, cli) => sum + (counts[cli]?.[recruiter] || 0), 0);
}

const grandTotal = clients.reduce((s, c) => s + rowTotal(c), 0);

export function ClientRecruiterMatrix({ title = 'Client vs Recruiter' }: MatrixProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-navy-dark">{title}</h2>
      </div>
      <Card className="p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-gray-medium font-medium py-2 pr-4">Client</th>
              {recruiters.map((rec) => (
                <th key={rec} className="text-center text-gray-medium font-medium px-3 py-2 whitespace-nowrap">{rec}</th>
              ))}
              <th className="text-center text-gray-medium font-semibold px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client} className="border-t">
                <td className="py-2 pr-4 font-medium text-navy-dark whitespace-nowrap">{client}</td>
                {recruiters.map((rec) => (
                  <td key={rec} className="px-3 py-2 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-navy-dark">
                      {counts[client][rec]}
                    </span>
                  </td>
                ))}
                <td className="px-3 py-2 text-center font-semibold text-navy-dark">{rowTotal(client)}</td>
              </tr>
            ))}
            <tr className="border-t">
              <td className="py-2 pr-4 font-semibold text-navy-dark">Total</td>
              {recruiters.map((rec) => (
                <td key={rec} className="px-3 py-2 text-center font-semibold text-navy-dark">{colTotal(rec)}</td>
              ))}
              <td className="px-3 py-2 text-center font-bold text-navy-dark">{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  );
}

export default ClientRecruiterMatrix;
