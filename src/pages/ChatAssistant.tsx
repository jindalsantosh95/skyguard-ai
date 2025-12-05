import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQueries = [
  "Which aircraft are affected by FAA-AD-2025-001?",
  "Show pending approvals for today",
  "List all completed audit packages",
  "What's the compliance status for A320 fleet?"
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AeroComply AI Assistant. I can help you query regulatory compliance data, check fleet impact, review approval status, and access audit information. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'faa-ad-2025-001': `Based on my analysis of **FAA-AD-2025-001** (Nose Landing Gear Torque Check):

**Affected Aircraft:**
- N12345 (A320, MSN-4521) - Status: Operational
- N23456 (A320, MSN-4892) - Status: Operational
- N78901 (A320, MSN-5123) - Status: Operational

**Total: 8 aircraft affected**

**Compliance Deadline:** June 15, 2025

**Current Status:** 2 work orders created, pending approval from Compliance Manager.

Would you like me to show the work order details or generate an impact report?`,
        'pending': `**Pending Approvals Summary:**

📋 **3 approvals require attention:**

1. **FAA-AD-2025-001** - WO-2025-001
   - Awaiting: Compliance Manager
   - Aircraft: N12345
   - Priority: Critical

2. **FAA-AD-2025-001** - WO-2025-002
   - Awaiting: Maintenance Planner
   - Aircraft: N23456
   - Priority: Critical

3. **EASA-AD-2025-0042** - WO-2025-003
   - Awaiting: Safety Engineer
   - Aircraft: N34567
   - Priority: High

Would you like me to open the approval workflow for any of these?`,
        'audit': `**Completed Audit Packages:**

✅ **EASA-AD-2025-0078** - Ready for export
   - All 3 sign-offs completed
   - Documents: 6 files included
   - Created: Jan 20, 2025

✅ **FAA-AD-2024-089** - Exported
   - All 3 sign-offs completed
   - Documents: 7 files included
   - Exported: Jan 15, 2025

📊 **Statistics:**
- 2 packages fully compliant
- 1 package in progress (EASA-AD-2025-0056)

Need me to prepare an export for any specific package?`,
        'a320': `**A320 Fleet Compliance Status:**

🛫 **Fleet Size:** 3 aircraft (N12345, N23456, N89012)

**Active ADs:**
- FAA-AD-2025-001 (Critical) - NLG Torque Check
  - 2/3 work orders in progress
  - Deadline: June 15, 2025
  
- EASA-AD-2025-0078 (Critical) - APU Fire Detection
  - ✅ Completed and audited

**Overall Compliance Rate:** 92%

**Upcoming Maintenance:**
- N12345: Feb 15, 2025
- N23456: Feb 10, 2025
- N89012: Feb 22, 2025

Any specific aircraft you'd like more details on?`
      };

      let response = "I understand your query. Let me search through the regulatory database and fleet records...\n\nBased on my Path-RAG analysis, I couldn't find specific data matching your exact query. Could you please try one of these:\n\n• Ask about a specific AD number\n• Query pending approvals\n• Check fleet compliance status\n• Request audit package information";

      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('faa-ad-2025-001') || lowerInput.includes('affected')) {
        response = responses['faa-ad-2025-001'];
      } else if (lowerInput.includes('pending') || lowerInput.includes('approval')) {
        response = responses['pending'];
      } else if (lowerInput.includes('audit') || lowerInput.includes('completed')) {
        response = responses['audit'];
      } else if (lowerInput.includes('a320') || lowerInput.includes('compliance status')) {
        response = responses['a320'];
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

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Assistant
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Query regulatory data using natural language powered by Path-RAG
        </p>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Messages Area */}
        <div className="flex-1 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
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
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    message.role === 'assistant' ? 'bg-primary/20' : 'bg-secondary'
                  )}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    'max-w-[80%] p-4 rounded-lg',
                    message.role === 'assistant' 
                      ? 'bg-secondary/50 text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  )}>
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                    <p className={cn(
                      'text-[10px] mt-2',
                      message.role === 'assistant' ? 'text-muted-foreground' : 'text-primary-foreground/70'
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
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about regulations, fleet impact, approvals..."
                className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Suggested Queries
            </h3>
            <div className="space-y-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => setInput(query)}
                  className="w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-card rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Path-RAG Status</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>FAISS Index</span>
                <span className="text-success">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SQLite Graph</span>
                <span className="text-success">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Documents</span>
                <span className="font-mono">156 indexed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
