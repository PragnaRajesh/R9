import type { User } from '../types';
import { Card } from './ui/card';
import MoneyFall from './ui/MoneyFall';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  UserCheck,
  Clock,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
  UserX,
  Calendar,
  UserPlus,
  Building2,
  Save
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';
import RoleActionBar from './RoleActionBar';
import AddEntitySheet from './ui/AddEntitySheet';

interface TeamLeadDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data for Team Lead specific metrics
const teamMembersData = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Recruiter', selections: 23, target: 25, performance: 92, status: 'active' },
  { id: 2, name: 'Mike Johnson', role: 'Recruiter', selections: 19, target: 20, performance: 95, status: 'active' },
  { id: 3, name: 'Lisa Wong', role: 'Senior Recruiter', selections: 21, target: 22, performance: 95, status: 'active' },
  { id: 4, name: 'David Kumar', role: 'Recruiter', selections: 18, target: 20, performance: 90, status: 'active' },
  { id: 5, name: 'Emma Davis', role: 'Junior Recruiter', selections: 12, target: 15, performance: 80, status: 'training' },
  { id: 6, name: 'James Wilson', role: 'Recruiter', selections: 16, target: 18, performance: 89, status: 'active' }
];

const teamPerformanceData = [
  { month: 'Jul', target: 100, achieved: 95, efficiency: 89 },
  { month: 'Aug', target: 110, achieved: 108, efficiency: 92 },
  { month: 'Sep', target: 120, achieved: 115, efficiency: 91 },
  { month: 'Oct', target: 125, achieved: 122, efficiency: 94 },
  { month: 'Nov', target: 130, achieved: 128, efficiency: 96 },
  { month: 'Dec', target: 135, achieved: 142, efficiency: 98 }
];

const teamLeadKpis = [
  { label: 'Team Utilization', value: 94, target: 90, color: 'bg-green-500', trend: 'up', change: 4.2 },
  { label: 'Quality Score', value: 89, target: 85, color: 'bg-blue-500', trend: 'up', change: 2.1 },
  { label: 'Training Hours', value: 42, target: 40, color: 'bg-purple-500', trend: 'up', change: 5.0 },
  { label: 'Team Satisfaction', value: 4.2, target: 4.0, color: 'bg-yellow-500', trend: 'up', change: 0.3 }
];

const workloadDistribution = [
  { name: 'Blue Collar', value: 28, color: '#1A4DFF' },
  { name: 'IT', value: 24, color: '#B5D7FF' },
  { name: 'Sales', value: 18, color: '#D9EBFF' },
  { name: 'Operations', value: 15, color: '#0A1F44' },
  { name: 'Others', value: 15, color: '#6B7280' }
];

export function TeamLeadDashboard({ user }: TeamLeadDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [candidateStatus, setCandidateStatus] = useState('');
  const [activeForm, setActiveForm] = useState<null | 'addCandidate' | 'addClient' | 'addRecruiter' | 'addClosure'>(null);

  const handleCandidateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, status: candidateStatus };
    console.log('New candidate submitted', payload);
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Replace with API call or state update as needed
    console.log('New client submitted', data);
  };

  return (
    <div className="p-6 space-y-8">
      <RoleActionBar role={user.role} onAction={(k) => setActiveForm(k)} showAddActions />
      <AddEntitySheet activeForm={activeForm} onOpenChange={(open) => { if (!open) setActiveForm(null); }} />

      {/* Team Overview Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Team Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Team Members</h3>
              <Users className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">12</p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              2 new this month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Total Selections</h3>
              <Target className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">1,247</p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              8.5% vs last month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Team Target</h3>
              <Award className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">98%</p>
            <Badge className="bg-green-100 text-green-800">Exceeded</Badge>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Avg Performance</h3>
              <BarChart3 className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">91%</p>
            <Badge className="bg-blue-100 text-blue-800">Excellent</Badge>
          </Card>
        </div>
      </section>

      {/* Team Lead KPIs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Leadership KPIs</h2>

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
          {teamLeadKpis.map((kpi, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-dark text-sm">{kpi.label}</h3>
                <div className={`flex items-center text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {kpi.change}%
                </div>
              </div>
              <p className="text-2xl font-semibold text-navy-dark mb-2">
                {kpi.value}{kpi.label === 'Team Satisfaction' ? '/5' : '%'}
              </p>
              <div className="text-sm text-gray-medium mb-3">
                Target: {kpi.target}{kpi.label === 'Team Satisfaction' ? '/5' : '%'}
              </div>
              <Progress 
                value={(kpi.value / kpi.target) * 100} 
                className="h-2"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* Team Performance and Member Management */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-navy-dark">Team Performance Trend</h3>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="target" stroke="#6B7280" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="achieved" stroke="#1A4DFF" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="#B5D7FF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Workload Distribution */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">Team Workload Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workloadDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {workloadDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
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

      {/* Client vs Recruiter Matrix */}
      <ClientRecruiterMatrix />

      {/* Team Members Management */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Team Members</h2>
          <div className="flex items-center gap-4">
            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="training">In Training</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-blue-bright hover:bg-blue-600 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Team Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembersData.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-xs bg-blue-bright text-white">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-navy-dark">{member.name}</div>
                    <div className="text-sm text-gray-medium">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-navy-dark">{member.selections}/{member.target}</div>
                  <div className="text-xs text-gray-medium">selections</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="h-2 rounded-full bg-blue-bright" style={{ width: `${(member.selections / member.target) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-medium">
                <div>{member.status}</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">Performance</div>
                  <div className="text-sm font-semibold">{member.performance}%</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
