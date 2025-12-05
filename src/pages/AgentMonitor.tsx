import { motion } from 'framer-motion';
import { Activity, Radar, FileSearch, Target, Wrench, CheckCircle, Shield, Rocket, Clipboard, RefreshCw, ArrowRight } from 'lucide-react';
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

const pipelineSteps = [
  { name: 'Detection', icon: Radar, description: 'Monitor regulatory feeds' },
  { name: 'Parsing', icon: FileSearch, description: 'Extract requirements' },
  { name: 'Impact', icon: Target, description: 'Analyze fleet impact' },
  { name: 'Implementation', icon: Wrench, description: 'Generate work orders' },
  { name: 'Testing', icon: CheckCircle, description: 'Validate compliance' },
  { name: 'Governance', icon: Shield, description: 'Human approvals' },
  { name: 'Deployment', icon: Rocket, description: 'Execute maintenance' },
  { name: 'Audit', icon: Clipboard, description: 'Compile evidence' },
];

export default function AgentMonitor() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agent Pipeline Monitor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time multi-agent processing status
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:bg-primary/10 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </motion.div>

      {/* Pipeline Visualization */}
      <div className="card-elevated p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Processing Pipeline</h2>
        <div className="flex items-center justify-between overflow-x-auto pb-4">
          {pipelineSteps.map((step, index) => {
            const agentStatus = mockAgentStatus.find(a => a.name.toLowerCase().includes(step.name.toLowerCase()));
            const Icon = step.icon;
            
            return (
              <div key={step.name} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex flex-col items-center min-w-[100px]',
                  )}
                >
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-all',
                    agentStatus?.status === 'active' && 'bg-success/20 border-2 border-success shadow-[0_0_20px_rgba(34,197,94,0.3)]',
                    agentStatus?.status === 'processing' && 'bg-primary/20 border-2 border-primary animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.3)]',
                    agentStatus?.status === 'idle' && 'bg-muted border-2 border-muted-foreground/30',
                    agentStatus?.status === 'error' && 'bg-destructive/20 border-2 border-destructive',
                  )}>
                    <Icon className={cn(
                      'w-6 h-6',
                      agentStatus?.status === 'active' && 'text-success',
                      agentStatus?.status === 'processing' && 'text-primary',
                      agentStatus?.status === 'idle' && 'text-muted-foreground',
                      agentStatus?.status === 'error' && 'text-destructive',
                    )} />
                  </div>
                  <p className="text-xs font-medium text-foreground">{step.name}</p>
                  <p className="text-[10px] text-muted-foreground text-center">{step.description}</p>
                  {agentStatus && (
                    <StatusBadge status={agentStatus.status} className="mt-2" />
                  )}
                </motion.div>
                
                {index < pipelineSteps.length - 1 && (
                  <div className="mx-2 flex-shrink-0">
                    <ArrowRight className={cn(
                      'w-5 h-5',
                      agentStatus?.status === 'processing' ? 'text-primary animate-pulse' : 'text-muted-foreground/50'
                    )} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockAgentStatus.map((agent, index) => {
          const IconComponent = iconMap[agent.icon] || Activity;
          
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'p-5 rounded-lg border bg-card hover:border-primary/30 transition-all cursor-pointer',
                agent.status === 'processing' && 'border-primary/50'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  'p-2.5 rounded-lg',
                  agent.status === 'active' && 'bg-success/20 text-success',
                  agent.status === 'idle' && 'bg-muted text-muted-foreground',
                  agent.status === 'processing' && 'bg-primary/20 text-primary',
                  agent.status === 'error' && 'bg-destructive/20 text-destructive'
                )}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <StatusBadge status={agent.status} />
              </div>

              <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">Last activity: {agent.lastActivity}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">Processed</span>
                <span className="text-lg font-bold font-mono text-foreground">{agent.processedItems}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Event Stream */}
      <div className="card-elevated p-5">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Live Event Stream
        </h2>
        <div className="space-y-2 font-mono text-xs">
          {[
            { time: '14:32:45', event: '[DETECTION] New regulatory update detected: FAA-AD-2025-007', type: 'info' },
            { time: '14:32:46', event: '[PARSING] Processing document: FAA-AD-2025-007.pdf', type: 'processing' },
            { time: '14:32:48', event: '[PARSING] Extracted 4 technical requirements', type: 'success' },
            { time: '14:32:49', event: '[IMPACT] Querying Path-RAG for fleet impact...', type: 'processing' },
            { time: '14:32:51', event: '[IMPACT] Identified 4 affected aircraft (A350)', type: 'success' },
            { time: '14:32:52', event: '[GOVERNANCE] Awaiting approval: WO-2025-001', type: 'warning' },
          ].map((log, i) => (
            <div key={i} className={cn(
              'flex items-start gap-3 p-2 rounded',
              log.type === 'info' && 'bg-info/5',
              log.type === 'processing' && 'bg-primary/5',
              log.type === 'success' && 'bg-success/5',
              log.type === 'warning' && 'bg-warning/5',
            )}>
              <span className="text-muted-foreground">{log.time}</span>
              <span className={cn(
                log.type === 'info' && 'text-info',
                log.type === 'processing' && 'text-primary',
                log.type === 'success' && 'text-success',
                log.type === 'warning' && 'text-warning',
              )}>
                {log.event}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
