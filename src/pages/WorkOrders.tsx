import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, Filter, Clock, Wrench, Users, Package, Plus, Play, CheckCircle } from 'lucide-react';
import { mockWorkOrders, WorkOrder } from '@/data/mockData';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import { toast } from '@/hooks/use-toast';

export default function WorkOrders() {
  const [orders, setOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartWork = (id: string) => {
    setOrders(prev => prev.map(o => 
      o.id === id ? { ...o, status: 'in_progress' as const } : o
    ));
    toast({
      title: "Work started",
      description: `Work order ${id} is now in progress`,
    });
  };

  const handleCompleteWork = (id: string) => {
    setOrders(prev => prev.map(o => 
      o.id === id ? { ...o, status: 'completed' as const } : o
    ));
    toast({
      title: "Work completed",
      description: `Work order ${id} has been marked as complete`,
    });
  };

  const handleCreateOrder = () => {
    const newOrder: WorkOrder = {
      id: `WO-2025-${String(orders.length + 1).padStart(3, '0')}`,
      adNumber: 'FAA-AD-2025-NEW',
      aircraftId: 'AC001',
      registration: 'N12345',
      description: 'New maintenance task - pending details',
      estimatedDowntime: '2 hours',
      status: 'pending',
      priority: 'medium',
      assignedTeam: 'Team Alpha',
      scheduledDate: new Date().toISOString().split('T')[0],
      parts: ['To be determined']
    };
    setOrders(prev => [newOrder, ...prev]);
    toast({
      title: "Work order created",
      description: `New work order ${newOrder.id} has been created`,
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
          <h1 className="text-2xl font-bold text-foreground">Work Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Maintenance task management and scheduling
          </p>
        </div>
        <button 
          onClick={handleCreateOrder}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Work Order
        </button>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: orders.length, color: 'primary' },
          { label: 'Pending', value: orders.filter(w => w.status === 'pending').length, color: 'warning' },
          { label: 'In Progress', value: orders.filter(w => w.status === 'in_progress').length, color: 'info' },
          { label: 'Completed', value: orders.filter(w => w.status === 'completed').length, color: 'success' },
        ].map((stat) => (
          <div key={stat.label} className="card-elevated p-4">
            <p className="text-3xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search work orders..."
            className="input-skyguard pl-10"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-interactive p-5"
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
                        className="px-2 py-0.5 rounded-lg bg-secondary text-xs text-muted-foreground"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {order.status === 'pending' && (
                  <button 
                    onClick={() => handleStartWork(order.id)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Start
                  </button>
                )}
                {order.status === 'in_progress' && (
                  <button 
                    onClick={() => handleCompleteWork(order.id)}
                    className="btn-primary flex items-center gap-2 text-sm bg-success hover:bg-success/90"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </button>
                )}
                <button className="btn-secondary text-sm">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
