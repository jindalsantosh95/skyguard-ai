import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles, Loader2, Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQueries = [
  {
    text: "Which aircraft are affected by FAA-AD-2025-001?",
    icon: "✈️"
  },
  {
    text: "Show pending approvals for today's maintenance tasks",
    icon: "📋"
  },
  {
    text: "List all completed audit packages for EASA ADs",
    icon: "📦"
  },
  {
    text: "What's the compliance status for A320 fleet?",
    icon: "📊"
  },
  {
    text: "Generate impact report for recent FAA directives",
    icon: "📝"
  },
  {
    text: "Show work orders scheduled for this week",
    icon: "🔧"
  }
];

const chatResponses: Record<string, string> = {
  'faa-ad-2025-001': `Based on my analysis of **FAA-AD-2025-001** (Nose Landing Gear Torque Check):

**Affected Aircraft:**
• N12345 (A320, MSN-4521) - Status: Operational
• N23456 (A320, MSN-4892) - Status: Operational  
• N78901 (A320, MSN-5123) - Status: Operational

**Total: 8 aircraft affected**

**Compliance Deadline:** June 15, 2025

**Current Status:** 2 work orders created, pending approval from Compliance Manager.

**Recommended Actions:**
1. Schedule torque checks during next routine maintenance
2. Order calibrated torque wrenches (3 units needed)
3. Allocate 4 hours downtime per aircraft

Would you like me to generate work orders or show the detailed impact report?`,

  'pending': `**Pending Approvals Summary:**

📋 **3 approvals require immediate attention:**

1. **FAA-AD-2025-001** - WO-2025-001
   • Awaiting: Compliance Manager
   • Aircraft: N12345
   • Priority: Critical ⚠️
   • Deadline: Today

2. **FAA-AD-2025-001** - WO-2025-002
   • Awaiting: Maintenance Planner
   • Aircraft: N23456
   • Priority: Critical ⚠️

3. **EASA-AD-2025-0042** - WO-2025-003
   • Awaiting: Safety Engineer
   • Aircraft: N34567
   • Priority: High

**Quick Actions Available:**
• Approve all pending items
• Send reminder to approvers
• Escalate critical items

Would you like me to open the approval workflow for any of these?`,

  'audit': `**Completed Audit Packages:**

✅ **EASA-AD-2025-0078** - Ready for export
   • All 3 sign-offs completed
   • Documents: 6 files included
   • Created: Jan 20, 2025

✅ **FAA-AD-2024-089** - Exported
   • All 3 sign-offs completed
   • Documents: 7 files included
   • Exported: Jan 15, 2025

📊 **Audit Statistics:**
• 2 packages fully compliant
• 1 package in progress (EASA-AD-2025-0056)
• Average completion time: 5.2 days

Need me to prepare an export or generate a compliance report?`,

  'a320': `**A320 Fleet Compliance Status:**

🛫 **Fleet Overview:** 3 aircraft total

| Reg. | Status | Compliance |
|------|--------|------------|
| N12345 | Operational | 94% |
| N23456 | Operational | 91% |
| N89012 | Operational | 96% |

**Active ADs Requiring Attention:**
• FAA-AD-2025-001 (Critical) - NLG Torque Check
  - 2/3 work orders in progress
  - Deadline: June 15, 2025
  
• EASA-AD-2025-0078 (Critical) - APU Fire Detection
  - ✅ Completed and audited

**Overall Fleet Compliance Rate:** 92%

**Upcoming Maintenance Windows:**
• N12345: Feb 15, 2025
• N23456: Feb 10, 2025
• N89012: Feb 22, 2025

Would you like detailed scheduling recommendations?`,

  'impact': `**Impact Report - Recent FAA Directives:**

📊 **Summary for Q1 2025:**

**Total ADs Processed:** 12
**Aircraft Impacted:** 6 out of 8 (75%)

**By Priority:**
• Critical: 3 ADs
• High: 5 ADs
• Medium: 4 ADs

**Estimated Operational Impact:**
• Total Downtime: 156 hours
• Parts Cost: $45,200
• Labor Hours: 312

**Top Affected Aircraft Types:**
1. A320 - 8 ADs
2. B737 - 3 ADs
3. B787 - 2 ADs

**Risk Assessment:** Medium-High
Recommend prioritizing NLG inspections before June deadline.

Shall I generate a detailed PDF report?`,

  'work orders': `**Work Orders - This Week:**

📅 **January 27 - February 2, 2025**

**Monday (Jan 27):**
• WO-2025-001 | N12345 | NLG Torque Check
  Team Alpha | 4 hours | Pending Approval

**Tuesday (Jan 28):**
• WO-2025-002 | N23456 | NLG Torque Check  
  Team Beta | 4 hours | In Progress

**Wednesday (Jan 29):**
• WO-2025-003 | N34567 | Wing Tank Inspection
  Team Alpha | 8 hours | Scheduled

**Resource Summary:**
• Team Alpha: 12 hours allocated
• Team Beta: 4 hours allocated
• Parts on order: 3 items

**Potential Conflicts:** None detected

Need me to optimize the schedule or create additional work orders?`
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your SkyGuard AI Assistant. I can help you with regulatory compliance queries, fleet impact analysis, approval workflows, and audit documentation.\n\nTry asking me about affected aircraft, pending approvals, or compliance status!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: uploadedFile ? `📎 ${uploadedFile.name}\n\n${textToSend}` : textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setUploadedFile(null);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "I understand your query. Let me search through the regulatory database and fleet records...\n\nBased on my Path-RAG analysis, I can help you with:\n\n• Specific AD queries (e.g., FAA-AD-2025-001)\n• Pending approvals and workflows\n• Audit package status\n• Fleet compliance reports\n• Work order scheduling\n\nPlease try one of the suggested queries or ask about a specific topic!";

      const lowerInput = textToSend.toLowerCase();
      if (lowerInput.includes('faa-ad-2025-001') || lowerInput.includes('affected')) {
        response = chatResponses['faa-ad-2025-001'];
      } else if (lowerInput.includes('pending') || lowerInput.includes('approval')) {
        response = chatResponses['pending'];
      } else if (lowerInput.includes('audit') || lowerInput.includes('completed')) {
        response = chatResponses['audit'];
      } else if (lowerInput.includes('a320') || lowerInput.includes('compliance status')) {
        response = chatResponses['a320'];
      } else if (lowerInput.includes('impact') || lowerInput.includes('report')) {
        response = chatResponses['impact'];
      } else if (lowerInput.includes('work order') || lowerInput.includes('scheduled') || lowerInput.includes('week')) {
        response = chatResponses['work orders'];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuery = (query: string) => {
    handleSend(query);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.includes('xml') || file.type.includes('json')) {
        setUploadedFile(file);
        toast({
          title: "Document attached",
          description: `${file.name} ready for analysis`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, XML, or JSON files",
          variant: "destructive"
        });
      }
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          SkyGuard AI Assistant
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Natural language queries powered by Path-RAG retrieval
        </p>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Messages Area */}
        <div className="flex-1 flex flex-col card-elevated overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                    message.role === 'assistant' ? 'bg-gradient-primary' : 'bg-secondary border border-border'
                  )}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    'max-w-[80%]',
                    message.role === 'assistant' 
                      ? 'chat-bubble-assistant' 
                      : 'chat-bubble-user'
                  )}>
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                    <p className={cn(
                      'text-[10px] mt-2 opacity-70'
                    )}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="chat-bubble-assistant flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Uploaded File Preview */}
          {uploadedFile && (
            <div className="px-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border w-fit">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{uploadedFile.name}</span>
                <button 
                  onClick={clearUploadedFile}
                  className="ml-2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.xml,.json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-xl bg-secondary border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                title="Attach document"
              >
                <Upload className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about regulations, fleet impact, approvals..."
                className="input-skyguard flex-1"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Queries Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-4">
          <div className="card-elevated p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Quick Queries
            </h3>
            <div className="space-y-2">
              {suggestedQueries.map((query, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestedQuery(query.text)}
                  className="w-full text-left p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 hover:border-primary/20 border border-transparent text-sm text-muted-foreground hover:text-foreground transition-all group"
                >
                  <span className="mr-2">{query.icon}</span>
                  {query.text}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="card-elevated p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">System Status</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Path-RAG Index</span>
                <span className="text-success font-medium">● Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Knowledge Graph</span>
                <span className="text-success font-medium">● Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Documents</span>
                <span className="font-mono text-foreground">156 indexed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Update</span>
                <span className="font-mono text-foreground">2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
