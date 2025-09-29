import { useState } from 'react';
import type { User } from '../types'; // ✅ import type from dedicated file
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Home, LayoutDashboard, Bell, Calendar, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetClose } from './ui/sheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useReminders } from '../context/RemindersContext';

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
  activeTab: 'home' | 'dashboard';
  onTabChange: (tab: 'home' | 'dashboard') => void;
}

export function DashboardHeader({ user, onLogout, activeTab, onTabChange }: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { reminders, addReminder, updateReminder } = useReminders();
  const [openAdd, setOpenAdd] = useState(false);
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState('');
  const [dateStr, setDateStr] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [timeStr, setTimeStr] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });
  const [errors, setErrors] = useState<{ content?: string; recipients?: string; date?: string; time?: string }>({});

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const today = new Date();
  const myTodaysReminders = reminders.filter((r) => {
    if (!r.recipients.includes(user.email)) return false;
    if (r.completed) return false;

    const base = new Date(r.fromTs);
    const baseDate = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const repeatDaily = r.repeatDaily !== false;

    return repeatDaily ? todayDate.getTime() >= baseDate.getTime() : isSameDay(base, today);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!content.trim()) newErrors.content = 'Content is required';

    const emails = recipients
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const emailRegex = /^[^\s@]+@headsuphrsolutions\.in$/;
    if (emails.length === 0 || !emails.every((e) => emailRegex.test(e))) {
      newErrors.recipients = 'Enter valid @headsuphrsolutions.in emails';
    }

    if (!dateStr) newErrors.date = 'Date is required';
    if (!timeStr) newErrors.time = 'Time is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm] = timeStr.split(':').map(Number);
    const scheduledTs = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0).getTime();

    addReminder({
      content: content.trim(),
      fromTs: scheduledTs,
      toTs: scheduledTs,
      recipients: emails,
      createdBy: user.email,
      repeatDaily: true,
      completed: false,
      completedAt: null,
    });

    setOpenAdd(false);
    setContent('');
    setRecipients('');

    const now = new Date();
    setDateStr(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
    );
    setTimeStr(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
  };

  const roleDisplayNames: Record<User['role'], string> = {
    recruiter: 'Recruiter',
    teamlead: 'Team Lead',
    manager: 'Manager',
    admin: 'Admin',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-soft">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: App Name & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-bright rounded-lg flex items-center justify-center shadow-soft">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-navy-dark">HeadsUp HR</h1>
            <p className="text-sm text-gray-medium">{roleDisplayNames[user.role]} Portal</p>
          </div>
        </div>

        {/* Center: Navigation Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('home')}
            className={`${
              activeTab === 'home' ? 'bg-white shadow-sm text-navy-dark' : 'text-gray-medium hover:text-navy-dark'
            }`}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('dashboard')}
            className={`${
              activeTab === 'dashboard' ? 'bg-white shadow-sm text-navy-dark' : 'text-gray-medium hover:text-navy-dark'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>

        {/* Right: Date, Reminders & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Date */}
          <div className="hidden md:flex items-center text-sm text-gray-medium">
            <Calendar className="w-4 h-4 mr-2" />
            {currentDate}
          </div>

          {/* Reminders Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Reminders
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center rounded-full">
                    {myTodaysReminders.length}
                  </Badge>
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="p-3 border-b">
                <h3 className="font-semibold text-navy-dark">Today's Reminders</h3>
              </div>
              {myTodaysReminders.length === 0 && (
                <div className="p-3 text-sm text-gray-medium">No reminders for today</div>
              )}
              {myTodaysReminders.map((r) => (
                <DropdownMenuItem key={r.id} className="p-3 flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm text-navy-dark">{r.content}</p>
                    <p className="text-xs text-gray-medium">
                      {new Date(r.fromTs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-bright ml-auto"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      updateReminder(r.id, { completed: true, completedAt: Date.now() });
                    }}
                  >
                    Mark done
                  </Button>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenAdd(true)}
                onSelect={() => {
                  setTimeout(() => setOpenAdd(true), 0);
                }}
                className="p-3 text-center text-blue-bright cursor-pointer"
              >
                Add New Reminder
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 text-center text-blue-bright">View all reminders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reminder Form (Sheet) */}
          <Sheet open={openAdd} onOpenChange={setOpenAdd}>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-navy-dark">Add New Reminder</SheetTitle>
                <SheetDescription>Specify From, To emails, and content.</SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder-content" className="text-navy-dark">
                    Content
                  </Label>
                  <Textarea
                    id="reminder-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write reminder details"
                  />
                  {errors.content && <p className="text-red-600 text-sm">{errors.content}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail" className="text-navy-dark">
                    From
                  </Label>
                  <Input id="fromEmail" value={user.email} readOnly />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-date" className="text-navy-dark">
                      Date
                    </Label>
                    <Input id="reminder-date" type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
                    {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-time" className="text-navy-dark">
                      Time
                    </Label>
                    <Input id="reminder-time" type="time" value={timeStr} onChange={(e) => setTimeStr(e.target.value)} />
                    {errors.time && <p className="text-red-600 text-sm">{errors.time}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients" className="text-navy-dark">
                    To (emails)
                  </Label>
                  <Input
                    id="recipients"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="name1@headsuphrsolutions.in, name2@headsuphrsolutions.in"
                  />
                  {errors.recipients && <p className="text-red-600 text-sm">{errors.recipients}</p>}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
                    Save Reminder
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant="outline" size="sm" className="mr-auto">
                  <div className="w-6 h-6 bg-blue-bright rounded-full flex items-center justify-center text-white text-xs mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-3 border-b">
                <p className="font-semibold text-navy-dark">{user.name}</p>
                <p className="text-sm text-gray-medium">{user.email}</p>
              </div>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
