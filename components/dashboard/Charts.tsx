
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { TelemetryData } from '../../types';

interface ChartsProps {
  data: TelemetryData[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  
  // We only show the last 30 points to keep the chart moving
  const chartData = data.slice(-30).map(d => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      
      {/* Temperature Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg flex flex-col h-full">
        <h4 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider shrink-0">Thermal Dynamics</h4>
        <div className="flex-1 w-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[20, 120]} stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', fontSize: '12px' }}
                itemStyle={{ color: '#e4e4e7' }}
                cursor={{ stroke: '#3f3f46' }}
              />
              <Line 
                type="monotone" 
                dataKey="cpuTemp" 
                stroke="#ef4444" 
                strokeWidth={2} 
                dot={false} 
                name="CPU Temp" 
                isAnimationActive={false}
              />
              <Line 
                type="monotone" 
                dataKey="gpuTemp" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                dot={false} 
                name="GPU Temp" 
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Load & Fan Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg flex flex-col h-full">
        <h4 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider shrink-0">Load vs Cooling</h4>
        <div className="flex-1 w-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis yAxisId="left" stroke="#52525b" fontSize={10} unit="%" tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#52525b" fontSize={10} domain={[0, 6000]} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', fontSize: '12px' }}
                itemStyle={{ color: '#e4e4e7' }}
                cursor={{ stroke: '#3f3f46' }}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="cpuLoad" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.1} 
                name="CPU Load" 
                isAnimationActive={false}
              />
              <Line 
                yAxisId="right"
                type="step" 
                dataKey="fanSpeed" 
                stroke="#10b981" 
                strokeWidth={1} 
                dot={false} 
                name="Fan RPM" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Charts;
