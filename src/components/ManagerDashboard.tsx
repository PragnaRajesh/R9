import { useState } from 'react';
import type { User } from '../types';
import { Card } from './ui/card';
import MoneyFall from './ui/MoneyFall';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Shield, 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Building,
  Clock,
  Award,
  FileText,
  Calendar,
  Activity,
  PieChart,
  Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Area, AreaChart } from 'recharts';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';
import RoleActionBar from './RoleActionBar';
import AddEntitySheet from './ui/AddEntitySheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Save } from 'lucide-react';
import { CandidateForm } from './CandidateForm';
import { RecruiterForm } from './RecruiterForm';
import { ClientForm } from './ClientForm';

interface ManagerDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data for Manager-specific metrics
const departmentOverview = [
  { team: 'Blue Collar', members: 15, target: 450, achieved: 467, efficiency: 104, budget: 180000 },
  { team: 'IT', members: 18, target: 520, achieved: 542, efficiency: 104, budget: 220000 },
  { team: 'Sales', members: 12, target: 380, achieved: 356, efficiency: 94, budget: 150000 },
  { team: 'Operations', members: 14, target: 420, achieved: 398, efficiency: 95, budget: 170000 },
  { team: 'Tech', members: 16, target: 480, achieved: 501, efficiency: 104, budget: 200000 },
  { team: 'Non-IT', members: 10, target: 300, achieved: 289, efficiency: 96, budget: 120000 },
  { team: 'Lateral', members: 13, target: 390, achieved: 378, efficiency: 97, budget: 160000 },
  { team: 'Admin', members: 8, target: 240, achieved: 234, efficiency: 98, budget: 100000 }
];

const monthlyRevenue = [
  { month: 'Jul', revenue: 1.8, cost: 1.2, profit: 0.6, efficiency: 88 },
  { month: 'Aug', revenue: 2.1, cost: 1.3, profit: 0.8, efficiency: 91 },
  { month: 'Sep', revenue: 2.3, cost: 1.4, profit: 0.9, efficiency: 93 },
  { month: 'Oct', revenue: 2.6, cost: 1.5, profit: 1.1, efficiency: 95 },
  { month: 'Nov', revenue: 2.8, cost: 1.6, profit: 1.2, efficiency: 97 },
  { month: 'Dec', revenue: 3.1, cost: 1.7, profit: 1.4, efficiency: 98 }
];

const managerKpis = [
  { label: 'ROI', value: 320, target: 300, unit: '%', trend: 'up', change: 6.7 },
  { label: 'Cost per Hire', value: 2340, target: 2500, unit: '$', trend: 'down', change: -6.4 },
  { label: 'Time to Fill', value: 18, target: 21, unit: ' days', trend: 'down', change: -14.3 },
  { label: 'Quality Index', value: 94, target: 90, unit: '%', trend: 'up', change: 4.4 }
];

const strategicMetrics = [
  { label: 'Client Satisfaction', value: 4.6, max: 5, color: 'bg-green-500' },
  { label: 'Market Share', value: 23.4, max: 30, color: 'bg-blue-500' },
  { label: 'Innovation Score', value: 87, max: 100, color: 'bg-purple-500' },
  { label: 'Compliance Rate', value: 98.5, max: 100, color: 'bg-indigo-500' }
];

const resourceAllocation = [
  { department: 'IT', allocated: 85, used: 82, available: 3 },
  { department: 'Sales', allocated: 70, used: 68, available: 2 },
  { department: 'Operations', allocated: 90, used: 87, available: 3 },
  { department: 'Tech', allocated: 80, used: 79, available: 1 },
  { department: 'Admin', allocated: 60, used: 58, available: 2 }
];

export function ManagerDashboard({ user }: ManagerDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const [candidateStatus, setCandidateStatus] = useState('');
  const [activeForm, setActiveForm] = useState<null | 'addCandidate' | 'addClient' | 'addRecruiter' | 'addClosure'>(null);

  const onSubmit = (key: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log(`${key} submitted`, { ...data, status: candidateStatus });
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
              Manager Dashboard - Strategic Overview
            </p>
            <p className="text-gray-medium max-w-lg">
              Drive organizational excellence with strategic insights, resource optimization, and performance management across all departments.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-48 bg-white rounded-xl shadow-soft flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 text-blue-bright mx-auto mb-4" />
                <p className="text-gray-medium">Strategic Leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Summary (role actions inline) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-navy-dark">Candidate Summary</h2>
          </div>
          <div>
            <RoleActionBar role={user.role} onAction={(k) => setActiveForm(k)} showAddActions />
          </div>
        </div>
      </section>

      {/* Department Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Department Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Total Teams</h3>
              <Building className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">8</p>
            <div className="flex items-center text-sm text-blue-600">
              <Activity className="w-4 h-4 mr-1" />
              All active & productive
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Total Revenue</h3>
              <DollarSign className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">$3.1M</p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18.2% vs last quarter
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Department Target</h3>
              <Target className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">102%</p>
            <Badge className="bg-green-100 text-green-800">Exceeded</Badge>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Efficiency Score</h3>
              <BarChart3 className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">97%</p>
            <Badge className="bg-blue-100 text-blue-800">Excellent</Badge>
          </Card>
        </div>
      </section>

      {/* Manager KPIs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Strategic KPIs</h2>

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
          {managerKpis.map((kpi, index) => (
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
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <p className="text-2xl font-semibold text-navy-dark mb-2">
                {kpi.unit === '$' ? '$' : ''}{kpi.value.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
              </p>
              <div className="text-sm text-gray-medium mb-3">
                Target: {kpi.unit === '$' ? '$' : ''}{kpi.target.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
              </div>
              <Progress 
                value={kpi.unit === '$' ? (kpi.target / kpi.value) * 100 : (kpi.value / kpi.target) * 100} 
                className="h-2"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* Revenue and Performance Analytics */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-navy-dark">Revenue & Profitability</h3>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyRevenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`$${value}M`, name === 'revenue' ? 'Revenue' : name === 'cost' ? 'Cost' : 'Profit']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#1A4DFF" />
                  <Bar dataKey="cost" fill="#B5D7FF" />
                  <Line type="monotone" dataKey="profit" stroke="#0A1F44" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Performance */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">Department Efficiency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentOverview} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="team" type="category" width={80} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Efficiency']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="efficiency" fill="#1A4DFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* Strategic Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Strategic Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicMetrics.map((metric, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold text-navy-dark text-sm mb-4">{metric.label}</h3>
              <div className="flex items-end space-x-2 mb-3">
                <span className="text-2xl font-semibold text-navy-dark">
                  {metric.value}
                </span>
                <span className="text-lg text-gray-medium">
                  /{metric.max}
                </span>
              </div>
              <Progress 
                value={(metric.value / metric.max) * 100} 
                className="h-3"
              />
              <div className="text-xs text-gray-medium mt-2">
                {((metric.value / metric.max) * 100).toFixed(1)}% of target
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Revenue and Performance */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resource Allocation */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">Resource Allocation</h3>
            <div className="space-y-4">
              {resourceAllocation.map((resource, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-navy-dark">{resource.department}</span>
                    <span className="text-gray-medium">
                      {resource.used}/{resource.allocated} ({resource.available} available)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-bright h-2 rounded-full" 
                      style={{ width: `${(resource.used / resource.allocated) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full bg-blue-bright hover:bg-blue-600 text-white justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Department Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Team Reviews
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Resource Planning
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PieChart className="w-4 h-4 mr-2" />
                Strategic Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                Performance Reviews
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Client vs Recruiter Matrix */}
      <ClientRecruiterMatrix />

      {/* Department Details Table */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Department Details</h2>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Achieved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efficiency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentOverview.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-navy-dark">{dept.team}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.members}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.target}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.achieved}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        dept.efficiency >= 100 ? 'bg-green-100 text-green-800' :
                        dept.efficiency >= 95 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {dept.efficiency}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${dept.budget.toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
