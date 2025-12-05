import { motion } from 'framer-motion';
import { CheckCircle, X, Check, User, Clock, FileText } from 'lucide-react';
import { mockApprovals, mockWorkOrders } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

export default function Approvals() {
  const pendingApprovals = mockApprovals.filter(a => a.status === 'pending');
  const completedApprovals = mockApprovals.filter(a => a.status !== 'pending');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Approval Workflow</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Human-in-the-loop governance and sign-offs
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
          <p className="text-3xl font-bold font-mono text-warning">{pendingApprovals.length}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p>
        </div>
        <div className="p-4 rounded-lg bg-success/10 border border-success/30">
          <p className="text-3xl font-bold font-mono text-success">
            {mockApprovals.filter(a => a.status === 'approved').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Approved</p>
        </div>
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
          <p className="text-3xl font-bold font-mono text-destructive">
            {mockApprovals.filter(a => a.status === 'rejected').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Rejected</p>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
          Pending Approvals
        </h2>

        <div className="space-y-3">
          {pendingApprovals.map((approval, index) => {
            const workOrder = mockWorkOrders.find(w => w.id === approval.workOrderId);
            
            return (
              <motion.div
                key={approval.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-lg bg-card border border-warning/30 hover:border-warning/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono font-bold text-foreground">
                        {approval.adNumber}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        WO: {approval.workOrderId}
                      </span>
                      <StatusBadge status={approval.status} />
                    </div>

                    <p className="text-foreground mb-3">
                      {workOrder?.description || 'Work order details'}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{approval.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Aircraft: {workOrder?.registration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-success/20 hover:bg-success/30 text-success transition-colors">
                      <Check className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Completed Approvals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>

        <div className="space-y-2">
          {completedApprovals.map((approval, index) => (
            <motion.div
              key={approval.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-card border border-border flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'p-2 rounded-lg',
                  approval.status === 'approved' ? 'bg-success/20' : 'bg-destructive/20'
                )}>
                  {approval.status === 'approved' ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <X className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {approval.adNumber} - {approval.role}
                  </p>
                  {approval.approver && (
                    <p className="text-xs text-muted-foreground">
                      By {approval.approver} • {approval.timestamp && new Date(approval.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <StatusBadge status={approval.status} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
