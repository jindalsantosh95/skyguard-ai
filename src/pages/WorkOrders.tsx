import { motion } from 'framer-motion';
import { ClipboardList, Search, Filter, Clock, Wrench, Users, Package } from 'lucide-react';
import { mockWorkOrders } from '@/data/mockData';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';

export default function WorkOrders() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Work Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Maintenance task management and scheduling
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          + Create Work Order
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: mockWorkOrders.length },
          { label: 'Pending', value: mockWorkOrders.filter(w => w.status === 'pending').length },
          { label: 'In Progress', value: mockWorkOrders.filter(w => w.status === 'in_progress').length },
          { label: 'Completed', value: mockWorkOrders.filter(w => w.status === 'completed').length },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-lg bg-card border border-border">
            <p className="text-3xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search work orders..."
            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm hover:bg-secondary transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {mockWorkOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-bold text-primary">{order.id}</span>
                  <span className="text-xs font-mono text-muted-foreground">→ {order.adNumber}</span>
                  <PriorityBadge priority={order.priority} />
                  <StatusBadge status={order.status} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {order.description}
                </h3>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-foreground">{order.registration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Est. {order.estimatedDowntime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{order.assignedTeam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    <span>Scheduled: {order.scheduledDate}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {order.parts.map((part, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-primary/20 text-foreground text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
