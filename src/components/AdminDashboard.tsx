import { useState } from 'react';
import type { User } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Crown, 
  Settings, 
  Users, 
  Database, 
  Shield, 
  Activity,
  TrendingUp,
  TrendingDown,
  Server,
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  UserPlus,
  Trash2,
  Edit,
  Eye,
  Download,
  Upload,
  Bell,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';
import MoneyFall from './ui/MoneyFall';
import RoleActionBar from './RoleActionBar';
import { Input } from './ui/input';
import AddEntitySheet from './ui/AddEntitySheet';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Save } from 'lucide-react';
import { CandidateForm } from './CandidateForm';
import { ClientForm } from './ClientForm';
import { RecruiterForm } from './RecruiterForm';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data for Admin-specific metrics
const systemMetrics = [
  { time: '00:00', users: 45, performance: 98, memory: 67, cpu: 23 },
  { time: '04:00', users: 23, performance: 99, memory: 58, cpu: 18 },
  { time: '08:00', users: 89, performance: 97, memory: 72, cpu: 34 },
  { time: '12:00', users: 134, performance: 96, memory: 78, cpu: 45 },
  { time: '16:00', users: 156, performance: 98, memory: 81, cpu: 52 },
  { time: '20:00', users: 112, performance: 99, memory: 69, cpu: 38 }
];

const userStats = [
  { role: 'Recruiters', count: 67, active: 64, inactive: 3, trend: 'up', change: 5.2 },
  { role: 'Team Leads', count: 12, active: 12, inactive: 0, trend: 'up', change: 0.0 },
  { role: 'Managers', count: 8, active: 8, inactive: 0, trend: 'up', change: 12.5 },
  { role: 'Admins', count: 4, active: 4, inactive: 0, trend: 'up', change: 0.0 }
];

const securityEvents = [
  { time: '10:45 AM', event: 'User login', user: 'sarah.chen@headsuphrsolutions.in', status: 'success', severity: 'low' },
  { time: '10:30 AM', event: 'Password change', user: 'mike.johnson@headsuphrsolutions.in', status: 'success', severity: 'medium' },
  { time: '10:15 AM', event: 'Failed login attempt', user: 'unknown@external.com', status: 'blocked', severity: 'high' },
  { time: '09:55 AM', event: 'Data export', user: 'lisa.wong@headsuphrsolutions.in', status: 'success', severity: 'medium' },
  { time: '09:30 AM', event: 'Permission change', user: 'admin@headsuphrsolutions.in', status: 'success', severity: 'high' }
];

const adminKpis = [
  { label: 'System Uptime', value: 99.8, target: 99.5, unit: '%', trend: 'up', change: 0.2 },
  { label: 'User Satisfaction', value: 4.7, target: 4.5, unit: '/5', trend: 'up', change: 4.4 },
  { label: 'Security Score', value: 95, target: 90, unit: '%', trend: 'up', change: 5.6 },
  { label: 'License Utilization', value: 87, target: 85, unit: '%', trend: 'up', change: 2.4 }
];

const recentUsers = [
  { id: 1, name: 'Alex Thompson', email: 'alex.thompson@headsuphrsolutions.in', role: 'Recruiter', status: 'active', lastLogin: '2 mins ago' },
  { id: 2, name: 'Maria Garcia', email: 'maria.garcia@headsuphrsolutions.in', role: 'Team Lead', status: 'active', lastLogin: '15 mins ago' },
  { id: 3, name: 'John Smith', email: 'john.smith@headsuphrsolutions.in', role: 'Manager', status: 'inactive', lastLogin: '2 hours ago' },
  { id: 4, name: 'Jennifer Liu', email: 'jennifer.liu@headsuphrsolutions.in', role: 'Recruiter', status: 'active', lastLogin: '5 mins ago' }
];

const storageBreakdown = [
  { category: 'User Data', used: 45, total: 100, color: '#1A4DFF' },
  { category: 'Application Logs', used: 23, total: 50, color: '#B5D7FF' },
  { category: 'Backups', used: 78, total: 100, color: '#D9EBFF' },
  { category: 'System Files', used: 34, total: 80, color: '#0A1F44' },
  { category: 'Media Assets', used: 56, total: 120, color: '#6B7280' }
];

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedUserRole, setSelectedUserRole] = useState('all');

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
              Admin Dashboard - System Control Center
            </p>
            <p className="text-gray-medium max-w-lg">
              Complete system oversight with advanced monitoring, user management, security controls, and organizational administration.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-48 bg-white rounded-xl shadow-soft flex items-center justify-center">
              <div className="text-center">
                <Crown className="w-16 h-16 text-blue-bright mx-auto mb-4" />
                <p className="text-gray-medium">System Administration</p>
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
            <AddEntitySheet activeForm={activeForm} onOpenChange={(open) => { if (!open) setActiveForm(null); }} />
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Total Users</h3>
              <Users className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">156</p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8 this week
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">System Health</h3>
              <Activity className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">99.8%</p>
            <Badge className="bg-green-100 text-green-800">Excellent</Badge>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Storage Used</h3>
              <Database className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">2.4TB</p>
            <Badge className="bg-yellow-100 text-yellow-800">78% capacity</Badge>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Security Score</h3>
              <Shield className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">95%</p>
            <Badge className="bg-green-100 text-green-800">Secure</Badge>
          </Card>
        </div>
      </section>

      {/* Admin KPIs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Administrative KPIs</h2>

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
          {adminKpis.map((kpi, index) => (
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
                {kpi.value}{kpi.unit}
              </p>
              <div className="text-sm text-gray-medium mb-3">
                Target: {kpi.target}{kpi.unit}
              </div>
              <Progress 
                value={(kpi.value / kpi.target) * 100} 
                className="h-2"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* System Performance and User Analytics */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Performance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-navy-dark">System Performance</h3>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1h</SelectItem>
                  <SelectItem value="24h">24h</SelectItem>
                  <SelectItem value="7d">7d</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={systemMetrics}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="performance" stackId="1" stroke="#1A4DFF" fill="#1A4DFF" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="memory" stackId="2" stroke="#B5D7FF" fill="#B5D7FF" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="cpu" stackId="3" stroke="#D9EBFF" fill="#D9EBFF" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* User Role Distribution */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">User Role Analytics</h3>
            <div className="space-y-4">
              {userStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-bright rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-dark">{stat.role}</p>
                      <p className="text-sm text-gray-medium">{stat.active} active, {stat.inactive} inactive</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-navy-dark">{stat.count}</p>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {stat.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Admin Tools */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Administrative Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-auto p-4 bg-blue-bright hover:bg-blue-600 text-white flex flex-col items-center space-y-2">
            <Users className="w-6 h-6" />
            <span>User Management</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Settings className="w-6 h-6" />
            <span>System Settings</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Database className="w-6 h-6" />
            <span>Data Management</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Shield className="w-6 h-6" />
            <span>Security Center</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <BarChart3 className="w-6 h-6" />
            <span>Analytics</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <FileText className="w-6 h-6" />
            <span>Reports</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Download className="w-6 h-6" />
            <span>Backups</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Bell className="w-6 h-6" />
            <span>Notifications</span>
          </Button>
        </div>
      </section>

      {/* Recent Activity and Storage */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Events */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-navy-dark">Recent Security Events</h3>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-1" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {securityEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    event.severity === 'high' ? 'bg-red-500' :
                    event.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy-dark">{event.event}</p>
                    <p className="text-xs text-gray-medium">{event.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-medium">{event.time}</p>
                    <Badge className={`text-xs ${
                      event.status === 'success' ? 'bg-green-100 text-green-800' :
                      event.status === 'blocked' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Storage Breakdown */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">Storage Breakdown</h3>
            <div className="space-y-4">
              {storageBreakdown.map((storage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-navy-dark">{storage.category}</span>
                    <span className="text-gray-medium">
                      {storage.used}GB / {storage.total}GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: storage.color,
                        width: `${(storage.used / storage.total) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-medium">
                    {((storage.used / storage.total) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Client vs Recruiter Matrix */}
      <ClientRecruiterMatrix />

      {/* Recent Users Table */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Recent Users</h2>
          <div className="flex items-center gap-4">
            <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="recruiter">Recruiters</SelectItem>
                <SelectItem value="teamlead">Team Leads</SelectItem>
                <SelectItem value="manager">Managers</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-bright hover:bg-blue-600 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-bright text-white text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-navy-dark">{user.name}</div>
                          <div className="text-sm text-gray-medium">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-blue-100 text-blue-800">{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-medium">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
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
