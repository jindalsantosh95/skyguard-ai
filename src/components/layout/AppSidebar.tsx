import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Plane,
  ClipboardList,
  CheckCircle,
  FileArchive,
  MessageSquare,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  Shield,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Regulatory Feed', url: '/regulatory', icon: FileText },
  { title: 'Fleet Management', url: '/fleet', icon: Plane },
  { title: 'Work Orders', url: '/work-orders', icon: ClipboardList },
  { title: 'Approvals', url: '/approvals', icon: CheckCircle },
  { title: 'Audit Packages', url: '/audit', icon: FileArchive },
  { title: 'Upload Documents', url: '/upload', icon: Upload },
  { title: 'AI Assistant', url: '/chat', icon: MessageSquare },
];

const secondaryItems = [
  { title: 'Agent Monitor', url: '/agents', icon: Activity },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0 shadow-soft"
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-primary-glow">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="font-bold text-foreground text-base">SkyGuard AI</span>
              <span className="text-xs text-muted-foreground">Regulatory Compliance</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className={cn(
        "mx-3 mt-4 p-3 rounded-xl bg-success/10 border border-success/20",
        collapsed && "mx-2 p-2"
      )}>
        <div className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <div className="w-2.5 h-2.5 bg-success rounded-full status-dot-active" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-success">System Online</span>
              <span className="text-[10px] text-muted-foreground">8 agents active</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          {!collapsed && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-3 block">
              Main Menu
            </span>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-primary/10 text-primary font-semibold border border-primary/20"
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "w-5 h-5")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          {!collapsed && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-3 block">
              System
            </span>
          )}
          {secondaryItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-primary/10 text-primary font-semibold border border-primary/20"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm",
            "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
