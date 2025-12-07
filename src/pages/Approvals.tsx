import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Check, User, Clock, FileText, MessageSquare } from 'lucide-react';
import { mockApprovals, mockWorkOrders } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Approvals() {
  const [approvals, setApprovals] = useState(mockApprovals);
  
  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const completedApprovals = approvals.filter(a => a.status !== 'pending');

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(a => 
      a.id === id 
        ? { ...a, status: 'approved' as const, approver: 'Current User', timestamp: new Date().toISOString() }
        : a
    ));
    toast({
      title: "Approved successfully",
      description: "Work order has been approved and moved to deployment queue",
    });
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.map(a => 
      a.id === id 
        ? { ...a, status: 'rejected' as const, approver: 'Current User', timestamp: new Date().toISOString() }
        : a
    ));
    toast({
      title: "Rejected",
      description: "Work order has been rejected and sent back for review",
      variant: "destructive"
    });
  };

  return (
    <div className="p-6 space-y-6">
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

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-3xl font-bold font-mono text-warning">{pendingApprovals.length}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p>
        </div>
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-3xl font-bold font-mono text-success">
            {approvals.filter(a => a.status === 'approved').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Approved</p>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-3xl font-bold font-mono text-destructive">
            {approvals.filter(a => a.status === 'rejected').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Rejected</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-warning status-dot-warning" />
          Pending Approvals
        </h2>

        <div className="space-y-3">
          {pendingApprovals.length === 0 ? (
            <div className="card-elevated p-8 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <p className="text-foreground font-medium">All caught up!</p>
              <p className="text-sm text-muted-foreground">No pending approvals at this time</p>
            </div>
          ) : (
            pendingApprovals.map((approval, index) => {
              const workOrder = mockWorkOrders.find(w => w.id === approval.workOrderId);
              
              return (
                <motion.div
                  key={approval.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-5 border-l-4 border-l-warning"
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
                      <button 
                        onClick={() => handleApprove(approval.id)}
                        className="p-2.5 rounded-xl bg-success/10 hover:bg-success/20 text-success transition-colors"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleReject(approval.id)}
                        className="p-2.5 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <div className="space-y-2">
          {completedApprovals.map((approval, index) => (
            <motion.div
              key={approval.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="card-elevated p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'p-2 rounded-xl',
                  approval.status === 'approved' ? 'bg-success/10' : 'bg-destructive/10'
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
