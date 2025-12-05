import { motion } from 'framer-motion';
import { Activity, Radar, FileSearch, Target, Wrench, CheckCircle, Shield, Rocket, Clipboard } from 'lucide-react';
import { mockAgentStatus } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  radar: Radar,
  'file-search': FileSearch,
  target: Target,
  wrench: Wrench,
  'check-circle': CheckCircle,
  shield: Shield,
  rocket: Rocket,
  clipboard: Clipboard,
};

export function AgentStatusWidget() {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-foreground">Agent Pipeline Status</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {mockAgentStatus.map((agent, index) => {
          const IconComponent = iconMap[agent.icon] || Activity;
          
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors',
                agent.status === 'processing' && 'border-primary/30'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  'p-1.5 rounded-md',
                  agent.status === 'active' && 'bg-success/20 text-success',
                  agent.status === 'idle' && 'bg-muted text-muted-foreground',
                  agent.status === 'processing' && 'bg-primary/20 text-primary',
                  agent.status === 'error' && 'bg-destructive/20 text-destructive'
                )}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-xs font-medium text-foreground truncate">{agent.name}</p>
              <p className="text-[10px] text-muted-foreground">{agent.lastActivity}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
