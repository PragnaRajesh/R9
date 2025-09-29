import type { UserRole } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Users, UserCheck, Shield, Crown } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'recruiter' as UserRole,
    title: 'Recruiter',
    description: 'Access your recruitment dashboard, manage candidates, and track performance',
    icon: Users,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'teamlead' as UserRole,
    title: 'Team Lead',
    description: 'Monitor team performance, review reports, and manage recruitment teams',
    icon: UserCheck,
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    id: 'manager' as UserRole,
    title: 'Manager',
    description: 'Strategic oversight, department analytics, and resource management',
    icon: Shield,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'admin' as UserRole,
    title: 'Admin',
    description: 'Full system access, user management, and organizational insights',
    icon: Crown,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  }
];

export function LandingPage({ onRoleSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-bright rounded-xl flex items-center justify-center shadow-soft">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-semibold text-navy-dark mb-4">
            HeadsUp HR Solutions
          </h1>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            Select your role to access your personalized dashboard and start managing your HR operations
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id}
                className={`p-8 cursor-pointer transition-smooth hover:scale-105 hover:shadow-lg border-2 ${role.color}`}
                onClick={() => onRoleSelect(role.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-soft">
                    <IconComponent className="w-8 h-8 text-blue-bright" />
                  </div>
                  <h3 className="text-2xl font-semibold text-navy-dark mb-3">
                    {role.title}
                  </h3>
                  <p className="text-gray-medium leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-medium">
            Need help? Contact support at{' '}
            <a href="mailto:support@headsuphrsolutions.in" className="text-blue-bright hover:underline">
              support@headsuphrsolutions.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
