import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Filter, Search, Clock, Plane, AlertTriangle, ExternalLink } from 'lucide-react';
import { mockRegulatoryUpdates } from '@/data/mockData';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

export default function RegulatoryFeed() {
  const [selectedSource, setSelectedSource] = useState<'all' | 'FAA' | 'EASA'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredUpdates = mockRegulatoryUpdates.filter(update => {
    if (selectedSource !== 'all' && update.source !== selectedSource) return false;
    if (selectedStatus !== 'all' && update.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Regulatory Feed</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live monitoring of FAA and EASA Airworthiness Directives
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-medium text-primary">Monitoring Active</span>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by AD number, title, or aircraft type..."
            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex rounded-lg border border-border overflow-hidden">
            {['all', 'FAA', 'EASA'].map((source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source as any)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  selectedSource === source
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                )}
              >
                {source === 'all' ? 'All Sources' : source}
              </button>
            ))}
          </div>
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="parsing">Parsing</option>
          <option value="analyzing">Analyzing</option>
          <option value="implementing">Implementing</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="deployed">Deployed</option>
          <option value="audited">Audited</option>
        </select>
      </div>

      {/* Updates Grid */}
      <div className="grid gap-4">
        {filteredUpdates.map((update, index) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'p-5 rounded-lg border bg-card hover:border-primary/30 transition-all cursor-pointer group',
              update.priority === 'critical' && 'border-l-4 border-l-destructive',
              update.priority === 'high' && 'border-l-4 border-l-warning'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    'text-sm font-mono font-bold px-2 py-0.5 rounded',
                    update.source === 'FAA' 
                      ? 'bg-info/20 text-info' 
                      : 'bg-aviation-teal/20 text-aviation-teal'
                  )}>
                    {update.adNumber}
                  </span>
                  <PriorityBadge priority={update.priority} />
                  <StatusBadge status={update.status} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {update.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {update.mandatoryAction}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    <span>{update.aircraftType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Due: {update.complianceDeadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{update.affectedAircraft} aircraft affected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Published: {update.publishedDate}</span>
                  </div>
                </div>
              </div>

              <button className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
