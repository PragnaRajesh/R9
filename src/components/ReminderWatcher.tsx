import { useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { useReminders } from '../context/RemindersContext';
import type { User } from '../types';

export function ReminderWatcher({ user }: { user: User }) {
  const { reminders } = useReminders();

  useEffect(() => {
    const dayStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const notifyKey = (id: string, email: string, day: string) => `reminder.notified.${id}.${email}.${day}`;

    const check = () => {
      const now = Date.now();
      const today = new Date();
      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      reminders.forEach(r => {
        if (!r.recipients.includes(user.email)) return;
        if (r.completed) return;

        const base = new Date(r.fromTs);
        const baseDateOnly = new Date(base.getFullYear(), base.getMonth(), base.getDate());
        const repeatDaily = r.repeatDaily !== false;

        // Do not notify before the start date
        if (todayDateOnly.getTime() < baseDateOnly.getTime()) return;

        let scheduledTs = base.getTime();
        if (repeatDaily) {
          const scheduledToday = new Date(
            today.getFullYear(), today.getMonth(), today.getDate(),
            base.getHours(), base.getMinutes(), 0, 0
          );
          scheduledTs = scheduledToday.getTime();
        } else {
          const sameDay = baseDateOnly.getTime() === todayDateOnly.getTime();
          if (!sameDay) return;
        }

        if (now >= scheduledTs) {
          const key = notifyKey(r.id, user.email, dayStr(today));
          if (!localStorage.getItem(key)) {
            toast(r.content, {
              description: new Date(scheduledTs).toLocaleString(),
            });
            try { localStorage.setItem(key, '1'); } catch {}
          }
        }
      });
    };

    check();
    const t = setInterval(check, 10000);
    return () => clearInterval(t);
  }, [reminders, user.email]);

  return null;
}
