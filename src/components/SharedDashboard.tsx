import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { FileText, UserPlus, Building2 } from 'lucide-react';
import { CandidateTable } from './CandidateTable';
import MoneyFall from './ui/MoneyFall';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';
import type { UserRole } from '../types';
import { roleActionKeys } from './RoleActionBar';

const kpiData = [
  { label: 'Targets Pending', value: 47, total: 100, color: 'bg-red-500' },
  { label: 'Selections', value: 234, total: 300, color: 'bg-blue-500' },
  { label: 'Joined', value: 189, total: 234, color: 'bg-green-500' },
  { label: 'Open Positions', value: 56, total: 80, color: 'bg-yellow-500' }
];

export function SharedDashboard({ role, onAction }: { role?: UserRole; onAction?: (key: string) => void }) {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const openForm = (key: 'addCandidate' | 'addClient' | 'addRecruiter' | 'addClosure') => {
    if (onAction) onAction(key);
  };

  const allowedActions = role ? roleActionKeys[role] || [] : [];
  const canAddCandidate = allowedActions.includes('addCandidate');
  const canAddRecruiter = allowedActions.includes('addRecruiter');
  const canAddClient = allowedActions.includes('addClient');

  return (
    <div className="space-y-8">
      {/* Action row above Recruiter KPIs: ARPU & Revenue metrics + role actions */}
      <section>
        <div className="flex items-center justify-between mb-6 gap-4">
          <div />

          <div className="flex items-center gap-3">
            {/* ARPU and Revenue as inline text */}
            <span className="metric-inline metric-block">
              ARPU:
              <div className="metric-value-inline mr-auto">$1,240</div>
              <MoneyFall aria-hidden />
            </span>

            <span className="metric-inline metric-block">
              Revenue Generated:
              <div className="metric-value-inline">$312,450</div>
              <MoneyFall aria-hidden />
            </span>

            {/* Action buttons - show only based on role permissions */}
            <div className="flex items-center gap-2">
              {canAddCandidate && (
                <Button className="bg-blue-bright hover:bg-blue-600 text-white" onClick={() => openForm('addCandidate')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Candidate
                </Button>
              )}

              {canAddClient && (
                <Button className="bg-blue-bright hover:bg-blue-600 text-white" onClick={() => openForm('addClient')}>
                  <Building2 className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              )}

              {canAddRecruiter && (
                <Button className="bg-blue-bright hover:bg-blue-600 text-white" onClick={() => openForm('addRecruiter')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Recruiter
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter KPIs cards */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Recruiter KPIs</h2>
          <Button className="bg-blue-bright hover:bg-blue-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className={`p-4 gap-0.5 cursor-pointer transition-smooth hover:shadow-lg ${selectedKPI === kpi.label ? 'ring-2 ring-blue-bright' : ''}`}
              onClick={() => setSelectedKPI(selectedKPI === kpi.label ? null : kpi.label)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-navy-dark text-sm">{kpi.label}</h3>
              </div>
              <p className="text-xl font-semibold text-navy-dark mb-2">{kpi.value}</p>
              <div className="flex items-center justify-between text-sm text-gray-medium mb-3">
                <span>of {kpi.total}</span>
                <span>{Math.round((kpi.value / kpi.total) * 100)}%</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <ClientRecruiterMatrix />

      {/* Candidate Summary area with admin-only Add Closure */}
      <section>
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-navy-dark mb-0">Candidate Summary</h2>
            <p className="text-gray-medium" />
          </div>

          <div className="flex items-center gap-3" />
        </div>

        <div className="mb-6">
          <CandidateTable selectedKPI={selectedKPI} onAction={onAction} />
        </div>
      </section>

    </div>
  );
}

export default SharedDashboard;
