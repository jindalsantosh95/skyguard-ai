import { Bell, Search, User, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 1, type: 'critical', message: 'New FAA AD detected: FAA-AD-2025-007', time: '2 min ago' },
  { id: 2, type: 'warning', message: 'Approval pending for WO-2025-001', time: '15 min ago' },
  { id: 3, type: 'success', message: 'Audit package ready for EASA-AD-2025-0078', time: '1 hour ago' },
];

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ADs, aircraft, work orders..."
            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Live Feed Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg border border-border">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">Live Feed</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-elevated overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        {notif.type === 'critical' && (
                          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                        )}
                        {notif.type === 'warning' && (
                          <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                        )}
                        {notif.type === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 bg-secondary/30">
                  <button className="text-xs text-primary hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Alex Morrison</p>
            <p className="text-xs text-muted-foreground">Compliance Manager</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
