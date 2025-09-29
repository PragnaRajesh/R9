import { useState } from 'react';
import type { User } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Users,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Building,
  Clock,
  Award,
  FileText,
  Filter,
  Search,
  MoreHorizontal,
  UserPlus,
  Building2,
  Save
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CandidateTable } from './CandidateTable';
import MoneyFall from './ui/MoneyFall';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';
import RoleActionBar from './RoleActionBar';
import { CandidateForm } from './CandidateForm';
import { ClientForm } from './ClientForm';
import { RecruiterForm } from './RecruiterForm';

interface RecruiterDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data
const analyticsData = [
  { id: 1, name: 'Blue Collar', count: 234, change: 12.5, color: '#1A4DFF' },
  { id: 2, name: 'Lateral', count: 189, change: -3.2, color: '#B5D7FF' },
  { id: 3, name: 'Sales', count: 156, change: 8.7, color: '#D9EBFF' },
  { id: 4, name: 'IT', count: 298, change: 15.3, color: '#0A1F44' },
  { id: 5, name: 'Non-IT', count: 142, change: 5.1, color: '#6B7280' },
  { id: 6, name: 'Operations', count: 167, change: -1.8, color: '#1A4DFF' },
  { id: 7, name: 'Tech', count: 203, change: 9.4, color: '#B5D7FF' },
  { id: 8, name: 'Admin', count: 89, change: 3.6, color: '#D9EBFF' }
];

const topPerformers = [
  { id: 1, name: 'Sarah Chen', team: 'IT', selections: 23, target: 25, avatar: null },
  { id: 2, name: 'Mike Johnson', team: 'Sales', selections: 19, target: 20, avatar: null },
  { id: 3, name: 'Lisa Wong', team: 'Tech', selections: 21, target: 22, avatar: null },
  { id: 4, name: 'David Kumar', team: 'Operations', selections: 18, target: 20, avatar: null }
];

const pieChartData = analyticsData.map(item => ({
  name: item.name,
  value: item.count,
  color: item.color
}));

const kpiData = [
  { label: 'Targets Pending', value: 47, total: 100, color: 'bg-red-500' },
  { label: 'Selections', value: 234, total: 300, color: 'bg-blue-500' },
  { label: 'Joined', value: 189, total: 234, color: 'bg-green-500' },
  { label: 'Open Positions', value: 56, total: 80, color: 'bg-yellow-500' }
];

const performanceCards = [
  { 
    label: 'Quality Score', 
    value: 87, 
    target: 90, 
    unit: '%',
    trend: 'up',
    change: 3.2
  },
  { 
    label: 'Target Achievement', 
    value: 92, 
    target: 100, 
    unit: '%',
    trend: 'up',
    change: 5.1
  },
  { 
    label: 'Avg Time to Hire', 
    value: 24, 
    target: 21, 
    unit: ' days',
    trend: 'down',
    change: -2.3
  },
  { 
    label: 'Source Efficiency', 
    value: 78, 
    target: 85, 
    unit: '%',
    trend: 'up',
    change: 1.8
  }
];

export function RecruiterDashboard({ user }: RecruiterDashboardProps) {
  const [selectedMonth, setSelectedMonth] = useState('november');
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [candidateStatus, setCandidateStatus] = useState('');

  const onSubmit = (key: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log(`${key} submitted`, data);
  };

  return (
    <div className="p-6 space-y-8">
      <RoleActionBar role={user.role} onAction={(k) => setActiveForm(k)} showAddActions />
      <AddEntitySheet activeForm={activeForm} onOpenChange={(open) => { if (!open) setActiveForm(null); }} />

      {/* Hero Section */}
      <section className="bg-gradient-sky rounded-2xl p-8 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-semibold text-navy-dark mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-lg text-navy-dark mb-6">
              Here's your recruitment performance overview
            </p>
            <p className="text-gray-medium max-w-lg">
              Track your team's progress, analyze performance metrics, and manage your recruitment pipeline with comprehensive insights and real-time data.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-48 bg-white rounded-xl shadow-soft flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-blue-bright mx-auto mb-4" />
                <p className="text-gray-medium">Dashboard Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Team Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-dark">{item.name}</h3>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-semibold text-navy-dark">{item.count}</span>
                <div className={`flex items-center text-sm ${
                  item.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-smooth" 
                  style={{ 
                    backgroundColor: item.color, 
                    width: `${Math.min((item.count / 300) * 100, 100)}%` 
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Performance Section */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Performance Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performers */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-bright" />
              Top Performers
            </h3>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-medium w-4">
                      #{index + 1}
                    </span>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-blue-bright text-white">
                        {performer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-dark text-sm">{performer.name}</p>
                    <p className="text-xs text-gray-medium">{performer.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-navy-dark">
                      {performer.selections}/{performer.target}
                    </p>
                    <p className="text-xs text-gray-medium">selections</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Team Summary */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-bright" />
              Top Performing Team
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-bright rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-navy-dark text-lg mb-2">IT Team</h4>
              <p className="text-3xl font-semibold text-blue-bright mb-2">298</p>
              <p className="text-gray-medium text-sm mb-4">Total Selections</p>
              <div className="flex items-center justify-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                15.3% vs last month
              </div>
            </div>
          </Card>

          {/* Distribution Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-4">Team Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelStyle={{ color: '#0A1F44' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* Recruiter KPIs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Recruiter KPIs</h2>

          <div className="flex items-center gap-3">
            <span className="metric-inline metric-block">ARPU:
            <div className="metric-value-inline">$1,240</div>
            <MoneyFall aria-hidden />
          </span>
            <span className="metric-inline metric-block">Revenue Generated:
            <div className="metric-value-inline">$312,450</div>
            <MoneyFall aria-hidden />
          </span>

            <Button className="bg-blue-bright hover:bg-blue-600 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className={`p-4 gap-0.5 cursor-pointer transition-smooth hover:shadow-lg ${
                selectedKPI === kpi.label ? 'ring-2 ring-blue-bright' : ''
              }`}
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

      {/* Performance Cards */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Performance Metrics</h2>
          <Button className="bg-blue-bright hover:bg-blue-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceCards.map((card, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-navy-dark text-sm">{card.label}</h3>
                <div className={`flex items-center text-sm ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(card.change)}%
                </div>
              </div>
              <div className="mb-3">
                <span className="text-xl font-semibold text-navy-dark">
                  {card.value}
                </span>
                <span className="text-lg text-gray-medium">{card.unit}</span>
              </div>
              <div className="text-sm text-gray-medium mb-2">
                Target: {card.target}{card.unit}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Client vs Recruiter Matrix */}
      <ClientRecruiterMatrix />

      {/* Pivot Summary & Filters */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-navy-dark mb-2">Candidate Summary</h2>
            <p className="text-gray-medium">
              <span className="font-semibold">1,478</span> candidates selected by{' '}
              <span className="font-semibold">Sarah Chen, Mike Johnson, Lisa Wong</span> and 12 others
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <RoleActionBar role={user.role} onAction={(k) => setActiveForm(k)} showAddActions />
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-medium" />
              <span className="text-sm text-gray-medium">Filters:</span>
            </div>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="september">September</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recruiters</SelectItem>
                <SelectItem value="sarah">Sarah Chen</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="lisa">Lisa Wong</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="tech-corp">TechCorp</SelectItem>
                <SelectItem value="global-inc">Global Inc</SelectItem>
                <SelectItem value="startup-x">Startup X</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>

        {/* Data Table */}
        <CandidateTable 
          selectedKPI={selectedKPI}
          filters={{
            month: selectedMonth,
            recruiter: selectedRecruiter,
            client: selectedClient
          }}
        />
      </section>
    </div>
  );
}
