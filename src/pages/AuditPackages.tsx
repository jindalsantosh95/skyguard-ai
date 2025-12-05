import { motion } from 'framer-motion';
import { FileArchive, Download, Eye, CheckCircle, FileText, Clock, Package } from 'lucide-react';
import { mockAuditPackages } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

export default function AuditPackages() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Packages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compliance evidence and documentation management
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-3xl font-bold font-mono text-primary">
            {mockAuditPackages.filter(a => a.status === 'compiling').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Compiling</p>
        </div>
        <div className="p-4 rounded-lg bg-success/10 border border-success/30">
          <p className="text-3xl font-bold font-mono text-success">
            {mockAuditPackages.filter(a => a.status === 'ready').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Ready</p>
        </div>
        <div className="p-4 rounded-lg bg-muted border border-border">
          <p className="text-3xl font-bold font-mono text-muted-foreground">
            {mockAuditPackages.filter(a => a.status === 'exported').length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Exported</p>
        </div>
      </div>

      {/* Audit Packages Grid */}
      <div className="grid gap-4">
        {mockAuditPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    pkg.status === 'ready' && 'bg-success/20',
                    pkg.status === 'compiling' && 'bg-primary/20',
                    pkg.status === 'exported' && 'bg-muted'
                  )}>
                    <FileArchive className={cn(
                      'w-5 h-5',
                      pkg.status === 'ready' && 'text-success',
                      pkg.status === 'compiling' && 'text-primary',
                      pkg.status === 'exported' && 'text-muted-foreground'
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'text-sm font-mono font-bold px-2 py-0.5 rounded',
                        pkg.source === 'FAA' 
                          ? 'bg-info/20 text-info' 
                          : 'bg-aviation-teal/20 text-aviation-teal'
                      )}>
                        {pkg.adNumber}
                      </span>
                      <StatusBadge status={pkg.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {new Date(pkg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Sign-offs Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Sign-offs</span>
                    <span className="font-mono text-foreground">
                      {pkg.signoffs}/{pkg.totalSignoffs}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className={cn(
                        'h-full rounded-full transition-all',
                        pkg.signoffs === pkg.totalSignoffs ? 'bg-success' : 'bg-primary'
                      )}
                      style={{ width: `${(pkg.signoffs / pkg.totalSignoffs) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className="flex flex-wrap gap-2">
                  {pkg.documents.map((doc, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-secondary text-xs text-muted-foreground"
                    >
                      <FileText className="w-3 h-3" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary/20 text-foreground text-sm font-medium transition-colors">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                {pkg.status === 'ready' && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    Export ZIP
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
