import { motion } from 'framer-motion';
import { 
  FileText, 
  Plane, 
  ClipboardList, 
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { RegulatoryFeedWidget } from '@/components/dashboard/RegulatoryFeedWidget';
import { AgentStatusWidget } from '@/components/dashboard/AgentStatusWidget';
import { ComplianceChart } from '@/components/dashboard/ComplianceChart';
import { FleetOverviewWidget } from '@/components/dashboard/FleetOverviewWidget';
import { PendingApprovalsWidget } from '@/components/dashboard/PendingApprovalsWidget';
import { mockDashboardStats } from '@/data/mockData';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time regulatory compliance monitoring and automation
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-sm font-medium text-success">All Systems Operational</span>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Active ADs"
          value={mockDashboardStats.totalADs}
          subtitle="Monitoring FAA & EASA"
          icon={FileText}
          variant="primary"
        />
        <MetricCard
          title="Pending Compliance"
          value={mockDashboardStats.pendingCompliance}
          subtitle="Requires attention"
          icon={AlertTriangle}
          variant="warning"
        />
        <MetricCard
          title="Fleet Size"
          value={`${mockDashboardStats.operationalAircraft}/${mockDashboardStats.fleetSize}`}
          subtitle="Operational aircraft"
          icon={Plane}
          variant="success"
        />
        <MetricCard
          title="Compliance Rate"
          value={`${mockDashboardStats.complianceRate}%`}
          subtitle="30-day average"
          icon={TrendingUp}
          trend={{ value: 2.4, positive: true }}
          variant="default"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Pending Work Orders"
          value={mockDashboardStats.pendingWorkOrders}
          icon={ClipboardList}
        />
        <MetricCard
          title="Pending Approvals"
          value={mockDashboardStats.pendingApprovals}
          icon={CheckCircle}
        />
        <MetricCard
          title="Avg Processing Time"
          value={mockDashboardStats.avgProcessingTime}
          icon={Clock}
        />
        <MetricCard
          title="Completed This Month"
          value={mockDashboardStats.completedThisMonth}
          icon={FileText}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <ComplianceChart />
          <RegulatoryFeedWidget />
        </div>

        {/* Right Column - 1 col */}
        <div className="space-y-6">
          <AgentStatusWidget />
          <PendingApprovalsWidget />
        </div>
      </div>

      {/* Fleet Overview - Full Width */}
      <FleetOverviewWidget />
    </div>
  );
}
