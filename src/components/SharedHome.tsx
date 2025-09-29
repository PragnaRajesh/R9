import React from 'react';
import type { User } from '../types';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  Building,
  ChevronDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SharedHomeProps {
  user: User;
}

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
  { id: 1, name: 'Sarah Chen', team: 'IT', selections: 23, target: 25 },
  { id: 2, name: 'Mike Johnson', team: 'Sales', selections: 19, target: 20 },
  { id: 3, name: 'Lisa Wong', team: 'Tech', selections: 21, target: 22 },
  { id: 4, name: 'David Kumar', team: 'Operations', selections: 18, target: 20 }
];

const pieChartData = analyticsData.map(item => ({ name: item.name, value: item.count, color: item.color }));

export function SharedHome({ user }: SharedHomeProps) {
  const recruiters = [
    'Arun','Sanjai','Sanjay','Sarika','Sreekutty','Suhasini','Swaracha','Shobha','Digambar','Akhil','Afrida'
  ];
  const recruiterStats: Record<string, { targets: number; selections: number; joined: number }> = {
    Arun: { targets: 34, selections: 4, joined: 1 },
    Sanjai: { targets: 34, selections: 4, joined: 1 },
    Sanjay: { targets: 34, selections: 4, joined: 1 },
    Sarika: { targets: 34, selections: 4, joined: 1 },
    Sreekutty: { targets: 34, selections: 4, joined: 1 },
    Suhasini: { targets: 34, selections: 4, joined: 1 },
    Swaracha: { targets: 34, selections: 4, joined: 1 },
    Shobha: { targets: 34, selections: 4, joined: 1 },
    Digambar: { targets: 34, selections: 4, joined: 1 },
    Akhil: { targets: 34, selections: 4, joined: 0 },
    Afrida: { targets: 40, selections: 6, joined: 2 },
  };

  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([...recruiters]);
  const allChecked = selected.length === recruiters.length;
  const toggleAll = () => setSelected(allChecked ? [] : [...recruiters]);
  const toggleOne = (name: string) =>
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  const filtered = recruiters.filter(r => r.toLowerCase().includes(search.toLowerCase()));

  const totals = selected.reduce(
    (acc, name) => {
      const stat = recruiterStats[name];
      if (stat) {
        acc.targets += stat.targets;
        acc.selections += stat.selections;
        acc.joined += stat.joined;
      }
      return acc;
    },
    { targets: 0, selections: 0, joined: 0 },
  );
  const targets = totals.targets;
  const selections = totals.selections;
  const joined = totals.joined;
  const yetToAchieve = targets - selections - joined;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
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

      {/* Summary + Recruiter Filter */}
      <section className="bg-blue-50 rounded-xl p-4 md:p-6 shadow-soft">
        <div className="flex items-center gap-8">
          {/* Inline KPIs in one row filling space */}
          <div className="flex flex-1 min-w-0 items-center justify-between gap-8 flex-nowrap divide-x divide-gray-200">
            <div className="space-y-1 px-2 md:px-4 first:pl-0">
              <p className="text-sm text-gray-medium">Targets</p>
              <p className="text-4xl font-semibold text-navy-dark">{targets}</p>
            </div>
            <div className="space-y-1 px-2 md:px-4">
              <p className="text-sm text-gray-medium">Yet to Achieve</p>
              <p className="text-4xl font-semibold text-navy-dark">{yetToAchieve}</p>
            </div>
            <div className="space-y-1 px-2 md:px-4">
              <p className="text-sm text-gray-medium">Selection</p>
              <p className="text-4xl font-semibold text-navy-dark">{selections}</p>
            </div>
            <div className="space-y-1 px-2 md:px-4 last:pr-0">
              <p className="text-sm text-gray-medium">Joined</p>
              <p className="text-4xl font-semibold text-navy-dark">{joined}</p>
            </div>
          </div>

          {/* Recruiter selector (no card) */}
          <div className="shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <p className="font-semibold text-navy-dark">Recruiter</p>
              <span className="text-sm text-gray-medium">{selected.length}/{recruiters.length} selected</span>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-56 justify-between bg-white">
                  Choose recruiters
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={allChecked} onCheckedChange={toggleAll as any} />
                    <span className="font-semibold text-navy-dark">Recruiter</span>
                  </div>
                  <span className="text-sm text-gray-medium">Record Count</span>
                </div>
                <div className="p-3 border-b">
                  <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to search" />
                </div>
                <div className="max-h-72 overflow-auto p-2">
                  {filtered.map(name => (
                    <div
                      key={name}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleOne(name)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOne(name);} }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={selected.includes(name)} onCheckedChange={() => toggleOne(name)} />
                        <span className="text-sm text-navy-dark">{name}</span>
                      </div>
                      <span className="text-sm text-gray-medium">1</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* Team Analytics */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Team Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-dark">{item.name}</h3>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
              {(item.name === 'Blue Collar' || item.name === 'Lateral') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-medium">Targets</span>
                    <span className="font-semibold text-navy-dark">{targets}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-medium">Yet to Achieve</span>
                    <span className="font-semibold text-navy-dark">{yetToAchieve}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-medium">Selection</span>
                    <span className="font-semibold text-navy-dark">{selections}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-medium">Joined</span>
                    <span className="font-semibold text-navy-dark">{joined}</span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Performance Overview */}
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
                    <span className="text-sm font-semibold text-gray-medium w-4">#{index + 1}</span>
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
                    <p className="text-sm font-semibold text-navy-dark">{performer.selections}/{performer.target}</p>
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
                  <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value as number, name as string]}
                    labelStyle={{ color: '#0A1F44' }}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
