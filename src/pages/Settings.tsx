import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Database, Key, Bell, Shield, Globe, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure system integrations and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Configuration */}
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">API Configuration</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">OpenAI API Key</label>
              <input
                type="password"
                value="sk-••••••••••••••••••••••••"
                readOnly
                className="w-full mt-1 bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Backend API URL</label>
              <input
                type="text"
                value="http://localhost:8000"
                readOnly
                className="w-full mt-1 bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-success/20">
              <Database className="w-5 h-5 text-success" />
            </div>
            <h2 className="font-semibold text-foreground">Database Status</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'FAISS Vector Store', status: 'Connected', docs: '156 documents' },
              { name: 'SQLite Knowledge Graph', status: 'Connected', docs: '1,248 nodes' },
              { name: 'Redis Streams', status: 'Active', docs: '2 streams' },
            ].map((db) => (
              <div key={db.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{db.name}</p>
                  <p className="text-xs text-muted-foreground">{db.docs}</p>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">
                  {db.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-warning/20">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <h2 className="font-semibold text-foreground">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'New AD Detection', enabled: true },
              { label: 'Approval Requests', enabled: true },
              { label: 'Work Order Updates', enabled: false },
              { label: 'Audit Completion', enabled: true },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{setting.label}</span>
                <button className={cn(
                  'w-10 h-6 rounded-full transition-colors relative',
                  setting.enabled ? 'bg-primary' : 'bg-muted'
                )}>
                  <span className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                    setting.enabled ? 'left-5' : 'left-1'
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Sources */}
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-info/20">
              <Globe className="w-5 h-5 text-info" />
            </div>
            <h2 className="font-semibold text-foreground">Regulatory Sources</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'FAA', url: 'https://rgl.faa.gov', status: 'Active' },
              { name: 'EASA', url: 'https://easa.europa.eu', status: 'Active' },
            ].map((source) => (
              <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{source.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{source.url}</p>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">
                  {source.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
