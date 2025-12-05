import { motion } from 'framer-motion';
import { Plane, Search, Filter, Clock, Wrench, Calendar } from 'lucide-react';
import { mockFleet } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

export default function FleetManagement() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fleet Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aircraft inventory and maintenance tracking
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Aircraft', value: mockFleet.length, color: 'primary' },
          { label: 'Operational', value: mockFleet.filter(a => a.status === 'operational').length, color: 'success' },
          { label: 'In Maintenance', value: mockFleet.filter(a => a.status === 'maintenance').length, color: 'warning' },
          { label: 'Inspection', value: mockFleet.filter(a => a.status === 'inspection').length, color: 'info' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-lg bg-card border border-border">
            <p className="text-3xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by registration, type, or serial..."
            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm hover:bg-secondary transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFleet.map((aircraft, index) => (
          <motion.div
            key={aircraft.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  aircraft.status === 'operational' && 'bg-success/20',
                  aircraft.status === 'maintenance' && 'bg-warning/20',
                  aircraft.status === 'inspection' && 'bg-info/20',
                  aircraft.status === 'grounded' && 'bg-destructive/20'
                )}>
                  <Plane className={cn(
                    'w-6 h-6',
                    aircraft.status === 'operational' && 'text-success',
                    aircraft.status === 'maintenance' && 'text-warning',
                    aircraft.status === 'inspection' && 'text-info',
                    aircraft.status === 'grounded' && 'text-destructive'
                  )} />
                </div>
                <div>
                  <p className="text-lg font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                    {aircraft.registration}
                  </p>
                  <p className="text-sm text-muted-foreground">{aircraft.type}</p>
                </div>
              </div>
              <StatusBadge status={aircraft.status} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Serial Number</span>
                <span className="font-mono text-foreground">{aircraft.serialNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Flight Hours</span>
                <span className="font-mono text-foreground">{aircraft.flightHours.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cycles</span>
                <span className="font-mono text-foreground">{aircraft.cycles.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Wrench className="w-3 h-3" />
                  <span>Last: {aircraft.lastMaintenance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Next: {aircraft.nextDue}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
