import React from 'react';
import type { UserRole } from '../types';
import { Button } from './ui/button';
import { actionLabels, roleActionKeys, type ActionKey } from './RoleActionBar';

interface HoverSidebarProps {
  role: UserRole;
  onAction?: (key: ActionKey) => void;
}

export function HoverSidebar({ role, onAction }: HoverSidebarProps) {
  const [open, setOpen] = React.useState(false);
  const hideTimer = React.useRef<number | null>(null);
  const keys = roleActionKeys[role] || [];

  const handleEnter = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setOpen(true);
  };

  const handleLeave = () => {
    hideTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="fixed left-0 top-16 z-40 h-[calc(100%-4rem)]"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-hidden={false}
    >
      {/* Edge trigger - thin visible cue at the edge */}
      <div className="absolute left-0 top-1/3 h-24 w-2 rounded-r-full bg-blue-bright opacity-90 shadow-soft" aria-hidden />

      {/* Sliding sidebar panel - hidden by default, appears when hovered */}
      <aside
        className={`transition-transform duration-200 ease-in-out absolute left-0 top-0 h-full bg-white border border-gray-200 shadow-soft rounded-r-xl overflow-hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '16rem' }}
        role="complementary"
        aria-label="Quick actions sidebar"
      >
        <div className="p-4 space-y-3">
          {/* Header cue */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-navy-dark">Quick Actions</h3>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            {keys.map((key) => (
              <Button
                key={key}
                onClick={() => {
                  if (onAction) {
                    onAction(key);
                  } else {
                    window.dispatchEvent(new CustomEvent('openAction', { detail: key }));
                  }
                }}
                className="bg-blue-bright hover:bg-blue-600 text-white w-full justify-start"
              >
                {actionLabels[key]}
              </Button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default HoverSidebar;
