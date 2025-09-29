import React from 'react';
import { Users, Target, TrendingUp, Calendar, MessageSquare, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface HomePageProps {
  userRole: string;
  userName: string;
}

export function HomePage({ userRole, userName }: HomePageProps) {
  const announcements = [
    {
      title: "Q4 Recruitment Drive",
      description: "Focus on tech roles for our expanding development teams",
      date: "Dec 15, 2024",
      type: "important"
    },
    {
      title: "New ATS Integration",
      description: "Enhanced tracking system now live across all departments",
      date: "Dec 10, 2024",
      type: "update"
    },
    {
      title: "Holiday Schedule",
      description: "Adjusted working hours during holiday season",
      date: "Dec 5, 2024",
      type: "info"
    }
  ];

  const quickActions = [
    {
      icon: Users,
      title: "Team Directory",
      description: "View all team members and contacts",
      action: "View Directory"
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book interview slots and team meetings",
      action: "Schedule Now"
    },
    {
      icon: MessageSquare,
      title: "HR Support",
      description: "Get help with HR policies and procedures",
      action: "Contact Support"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your profile and preferences",
      action: "Manage Settings"
    }
  ];

  const companyMetrics = [
    {
      title: "Total Employees",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-bright"
    },
    {
      title: "Open Positions",
      value: "89",
      change: "+5%",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "This Month Hires",
      value: "23",
      change: "+18%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-sky rounded-xl p-8 shadow-soft">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-dark mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-lg text-gray-medium">
            {getWelcomeMessage(userRole)}
          </p>
        </div>
      </div>

      {/* Company Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="shadow-soft hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-medium mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-navy-dark">{metric.value}</p>
                    <p className={`text-sm ${metric.color}`}>{metric.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-blue-50 ${metric.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-navy-dark">Quick Actions</CardTitle>
          <CardDescription>Frequently used features and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-smooth cursor-pointer">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-bright">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-dark">{action.title}</h4>
                      <p className="text-sm text-gray-medium mb-2">{action.description}</p>
                      <Button variant="outline" size="sm" className="text-blue-bright border-blue-bright hover:bg-blue-50">
                        {action.action}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-navy-dark">Company Announcements</CardTitle>
          <CardDescription>Latest updates and important notices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-smooth">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-navy-dark">{announcement.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        announcement.type === 'important' ? 'bg-red-100 text-red-700' :
                        announcement.type === 'update' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {announcement.type}
                      </span>
                    </div>
                    <p className="text-gray-medium">{announcement.description}</p>
                  </div>
                  <span className="text-sm text-gray-400">{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-navy-dark">HR Resources</CardTitle>
          <CardDescription>Important documents and company policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-smooth cursor-pointer">
              <h4 className="font-semibold text-navy-dark mb-2">Employee Handbook</h4>
              <p className="text-sm text-gray-medium">Company policies and procedures</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-smooth cursor-pointer">
              <h4 className="font-semibold text-navy-dark mb-2">Benefits Guide</h4>
              <p className="text-sm text-gray-medium">Health insurance, PTO, and more</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-smooth cursor-pointer">
              <h4 className="font-semibold text-navy-dark mb-2">Training Materials</h4>
              <p className="text-sm text-gray-medium">Professional development resources</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getWelcomeMessage(role: string): string {
  switch (role) {
    case 'recruiter':
      return 'Ready to find the perfect candidates for our growing teams. Your dashboard below shows your current recruitment metrics and performance.';
    case 'teamlead':
      return 'Leading your team to success with insights and tools for effective management. Check your team metrics in the dashboard below.';
    case 'manager':
      return 'Strategic oversight of departmental operations and performance. Your management dashboard provides comprehensive insights below.';
    case 'admin':
      return 'System administration and company-wide management tools at your fingertips. Access your admin controls in the dashboard below.';
    default:
      return 'Welcome to HeadsUp HR Solutions. Your personalized dashboard is ready below.';
  }
}