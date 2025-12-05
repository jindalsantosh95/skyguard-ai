import { motion } from 'framer-motion';
import { Plane, ArrowRight } from 'lucide-react';
import { mockFleet } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'react-router-dom';

export function FleetOverviewWidget() {
  const statusCounts = mockFleet.reduce((acc, aircraft) => {
    acc[aircraft.status] = (acc[aircraft.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Fleet Overview</h2>
        </div>
        <Link 
          to="/fleet"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { status: 'operational', label: 'Operational', count: statusCounts.operational || 0 },
          { status: 'maintenance', label: 'Maintenance', count: statusCounts.maintenance || 0 },
          { status: 'inspection', label: 'Inspection', count: statusCounts.inspection || 0 },
          { status: 'grounded', label: 'Grounded', count: statusCounts.grounded || 0 },
        ].map((item) => (
          <div 
            key={item.status}
            className="text-center p-2 rounded-lg bg-secondary/30 border border-border"
          >
            <p className="text-lg font-bold font-mono text-foreground">{item.count}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Aircraft List */}
      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
        {mockFleet.slice(0, 5).map((aircraft, index) => (
          <motion.div
            key={aircraft.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                <Plane className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-mono font-medium text-foreground">{aircraft.registration}</p>
                <p className="text-xs text-muted-foreground">{aircraft.type}</p>
              </div>
            </div>
            <StatusBadge status={aircraft.status} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
