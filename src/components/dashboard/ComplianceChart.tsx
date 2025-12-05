import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Aug', compliance: 88, processed: 12 },
  { month: 'Sep', compliance: 91, processed: 15 },
  { month: 'Oct', compliance: 89, processed: 18 },
  { month: 'Nov', compliance: 93, processed: 14 },
  { month: 'Dec', compliance: 92, processed: 16 },
  { month: 'Jan', compliance: 94.2, processed: 20 },
];

export function ComplianceChart() {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Compliance Trend</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Compliance %</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">ADs Processed</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 92%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 72%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 72%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
              domain={[80, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
            />
            <Area
              type="monotone"
              dataKey="compliance"
              stroke="hsl(187, 92%, 50%)"
              strokeWidth={2}
              fill="url(#complianceGradient)"
            />
            <Area
              type="monotone"
              dataKey="processed"
              stroke="hsl(142, 72%, 45%)"
              strokeWidth={2}
              fill="url(#processedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
