import React, { useEffect, useState } from 'react';
import { AIInsight } from '../../types';
import { Activity, AlertTriangle, CheckCircle, ShieldAlert, RefreshCw, ScanLine } from 'lucide-react';

interface InsightPanelProps {
  insight: AIInsight | null;
  isLoading: boolean;
  onAnalyze: () => void;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ insight, isLoading, onAnalyze }) => {
  
  const [isAutoScanning, setIsAutoScanning] = useState(true);

  // Fake auto-scan visual effect
  useEffect(() => {
    const interval = setInterval(() => {
        // Just a visual toggle to make the UI feel alive
        setIsAutoScanning(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      case 'warning': return 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]';
      case 'healthy': return 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
      default: return 'bg-zinc-800 border-zinc-700 text-zinc-400';
    }
  };

  const getStatusIcon = (status: string) => {
     switch(status) {
      case 'critical': return <ShieldAlert className="w-6 h-6" />;
      case 'warning': return <AlertTriangle className="w-6 h-6" />;
      case 'healthy': return <CheckCircle className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg flex flex-col h-full relative overflow-hidden">
      
      {/* Header with Auto-Scan indicator */}
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-indigo-500' : 'bg-emerald-500'} animate-pulse`}></div>
                <div className={`absolute inset-0 rounded-full ${isLoading ? 'bg-indigo-500' : 'bg-emerald-500'} opacity-50 animate-ping`}></div>
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">
            System Diagnostics
            </h3>
        </div>
        
        <button 
          onClick={onAnalyze}
          disabled={isLoading}
          className="group relative px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-mono font-medium rounded-lg transition-all flex items-center gap-2 overflow-hidden"
        >
            <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="relative z-10">{isLoading ? 'GENERATING REPORT...' : 'GENERATE REPORT'}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative z-10">
        
        {/* Empty State / Scanning Visual */}
        {!insight && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-800 rounded-lg bg-zinc-950/30">
                <div className="relative mb-4">
                    <ScanLine className={`w-12 h-12 text-zinc-600 ${isAutoScanning ? 'text-indigo-500/50' : ''} transition-colors duration-1000`} />
                    <div className="absolute top-0 left-0 w-full h-full border-t-2 border-indigo-500/50 animate-[scanline_2s_linear_infinite]"></div>
                </div>
                <h4 className="text-zinc-300 font-medium mb-2">Real-time Monitoring Active</h4>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto leading-relaxed">
                    Digital twin is synchronized. Telemetry is being recorded. Generate a report to analyze patterns with Gemini AI.
                </p>
            </div>
        )}

        {/* Loading State */}
        {isLoading && (
            <div className="h-full flex flex-col items-center justify-center gap-4 p-8 bg-zinc-950/50 rounded-lg border border-zinc-800">
                <div className="flex gap-1">
                    <div className="w-1 h-8 bg-indigo-500 animate-[pulse_1s_ease-in-out_infinite]"></div>
                    <div className="w-1 h-12 bg-indigo-500 animate-[pulse_1s_ease-in-out_0.1s_infinite]"></div>
                    <div className="w-1 h-6 bg-indigo-500 animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
                    <div className="w-1 h-10 bg-indigo-500 animate-[pulse_1s_ease-in-out_0.3s_infinite]"></div>
                </div>
                <p className="text-indigo-400 text-xs font-mono animate-pulse">PROCESSING NEURAL DATA...</p>
            </div>
        )}

        {/* Results State */}
        {insight && !isLoading && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Top Status Bar */}
            <div className={`p-4 rounded-xl border backdrop-blur-md flex items-center justify-between ${getStatusColor(insight.status)}`}>
                <div className="flex items-center gap-3">
                    {getStatusIcon(insight.status)}
                    <div>
                        <div className="font-bold uppercase tracking-wider text-xs opacity-70">System Health</div>
                        <div className="font-bold text-lg capitalize">{insight.status}</div>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-xs opacity-70">CONFIDENCE</div>
                    <div className="font-mono font-bold">98.4%</div>
                </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl relative group">
                <div className="absolute -left-[1px] top-4 bottom-4 w-1 bg-indigo-500 rounded-r"></div>
                <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                    <Activity size={12} /> Analysis Summary
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    {insight.summary}
                </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-950/30 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <h4 className="text-xs uppercase tracking-wider text-blue-400 mb-2">Predicted Event</h4>
                    <p className="text-sm text-zinc-200 font-medium">{insight.prediction}</p>
                </div>
                <div className="bg-zinc-950/30 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <h4 className="text-xs uppercase tracking-wider text-purple-400 mb-2">Est. Lifespan</h4>
                    <p className="text-sm text-zinc-200 font-medium">{insight.estimatedLifespan}</p>
                </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-xl">
                <h4 className="text-xs uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-2">
                    <CheckCircle size={12} /> Recommended Action
                </h4>
                <p className="text-sm text-white">
                    {insight.recommendation}
                </p>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default InsightPanel;