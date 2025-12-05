import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, User } from 'lucide-react';
import { mockApprovals, mockWorkOrders } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'react-router-dom';

export function PendingApprovalsWidget() {
  const pendingApprovals = mockApprovals.filter(a => a.status === 'pending').slice(0, 4);

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-warning" />
          <h2 className="font-semibold text-foreground">Pending Approvals</h2>
          <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-xs font-medium">
            {pendingApprovals.length}
          </span>
        </div>
        <Link 
          to="/approvals"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {pendingApprovals.map((approval, index) => {
          const workOrder = mockWorkOrders.find(wo => wo.id === approval.workOrderId);
          
          return (
            <motion.div
              key={approval.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg border border-warning/30 bg-warning/5 hover:bg-warning/10 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-foreground">
                      {approval.adNumber}
                    </span>
                    <StatusBadge status={approval.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {workOrder?.description || 'Work order details'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Awaiting: {approval.role}
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                  Review
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
