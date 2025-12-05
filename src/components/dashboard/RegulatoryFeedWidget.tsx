import { motion } from 'framer-motion';
import { FileText, ArrowRight, Clock } from 'lucide-react';
import { mockRegulatoryUpdates } from '@/data/mockData';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function RegulatoryFeedWidget() {
  const recentUpdates = mockRegulatoryUpdates.slice(0, 4);

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Recent Regulatory Updates</h2>
        </div>
        <Link 
          to="/regulatory"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {recentUpdates.map((update, index) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer',
              update.status === 'new' && 'border-l-2 border-l-info'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    'text-xs font-mono font-bold',
                    update.source === 'FAA' ? 'text-info' : 'text-aviation-teal'
                  )}>
                    {update.adNumber}
                  </span>
                  <PriorityBadge priority={update.priority} />
                </div>
                <p className="text-sm text-foreground truncate">{update.title}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Due: {update.complianceDeadline}
                  </span>
                  <span>{update.affectedAircraft} aircraft affected</span>
                </div>
              </div>
              <StatusBadge status={update.status} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
