import { cn } from '@/lib/utils';

type StatusType = 'new' | 'parsing' | 'analyzing' | 'implementing' | 'testing' | 'pending_approval' | 'deployed' | 'audited' | 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'approved' | 'rejected' | 'compiling' | 'ready' | 'exported' | 'active' | 'idle' | 'processing' | 'error' | 'operational' | 'maintenance' | 'grounded' | 'inspection';

type PriorityType = 'critical' | 'high' | 'medium' | 'low';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

interface PriorityBadgeProps {
  priority: PriorityType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-info/20 text-info border-info/30' },
  parsing: { label: 'Parsing', className: 'bg-aviation-purple/20 text-aviation-purple border-aviation-purple/30' },
  analyzing: { label: 'Analyzing', className: 'bg-primary/20 text-primary border-primary/30' },
  implementing: { label: 'Implementing', className: 'bg-warning/20 text-warning border-warning/30' },
  testing: { label: 'Testing', className: 'bg-info/20 text-info border-info/30' },
  pending_approval: { label: 'Pending Approval', className: 'bg-warning/20 text-warning border-warning/30' },
  deployed: { label: 'Deployed', className: 'bg-success/20 text-success border-success/30' },
  audited: { label: 'Audited', className: 'bg-success/20 text-success border-success/30' },
  pending: { label: 'Pending', className: 'bg-warning/20 text-warning border-warning/30' },
  in_progress: { label: 'In Progress', className: 'bg-primary/20 text-primary border-primary/30' },
  completed: { label: 'Completed', className: 'bg-success/20 text-success border-success/30' },
  cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground border-muted-foreground/30' },
  approved: { label: 'Approved', className: 'bg-success/20 text-success border-success/30' },
  rejected: { label: 'Rejected', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  compiling: { label: 'Compiling', className: 'bg-primary/20 text-primary border-primary/30' },
  ready: { label: 'Ready', className: 'bg-success/20 text-success border-success/30' },
  exported: { label: 'Exported', className: 'bg-muted text-muted-foreground border-muted-foreground/30' },
  active: { label: 'Active', className: 'bg-success/20 text-success border-success/30' },
  idle: { label: 'Idle', className: 'bg-muted text-muted-foreground border-muted-foreground/30' },
  processing: { label: 'Processing', className: 'bg-primary/20 text-primary border-primary/30 animate-pulse' },
  error: { label: 'Error', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  operational: { label: 'Operational', className: 'bg-success/20 text-success border-success/30' },
  maintenance: { label: 'Maintenance', className: 'bg-warning/20 text-warning border-warning/30' },
  grounded: { label: 'Grounded', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  inspection: { label: 'Inspection', className: 'bg-info/20 text-info border-info/30' },
};

const priorityConfig: Record<PriorityType, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  high: { label: 'High', className: 'bg-warning/20 text-warning border-warning/30' },
  medium: { label: 'Medium', className: 'bg-info/20 text-info border-info/30' },
  low: { label: 'Low', className: 'bg-muted text-muted-foreground border-muted-foreground/30' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
