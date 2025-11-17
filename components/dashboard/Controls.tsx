
import React from 'react';
import { SystemState, EnvironmentProfile, PowerMode } from '../../types';
import { Zap, Leaf, Gauge, MapPin } from 'lucide-react';

interface SystemModesProps {
  state: SystemState;
  onChange: (updates: Partial<SystemState>) => void;
}

const SystemModes: React.FC<SystemModesProps> = ({ state, onChange }) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Power Profile Selector */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3 text-zinc-400">
            <Zap size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Power Profile</span>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={() => onChange({ powerMode: 'eco' })}
                className={`flex-1 py-3 px-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    state.powerMode === 'eco' 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                }`}
            >
                <Leaf size={18} />
                <span className="text-[10px] font-mono uppercase">Eco</span>
            </button>

            <button 
                onClick={() => onChange({ powerMode: 'balanced' })}
                className={`flex-1 py-3 px-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    state.powerMode === 'balanced' 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                }`}
            >
                <Gauge size={18} />
                <span className="text-[10px] font-mono uppercase">Auto</span>
            </button>

            <button 
                onClick={() => onChange({ powerMode: 'turbo' })}
                className={`flex-1 py-3 px-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    state.powerMode === 'turbo' 
                    ? 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                }`}
            >
                <Zap size={18} />
                <span className="text-[10px] font-mono uppercase">Turbo</span>
            </button>
        </div>
      </div>

      {/* Environment Context (Simulating IoT Bridge) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative">
        <div className="flex items-center justify-between mb-3 text-zinc-400">
            <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Location Context</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                IoT LINKED
            </div>
        </div>

        <div className="relative">
            <select 
                value={state.environmentProfile}
                onChange={(e) => onChange({ environmentProfile: e.target.value as EnvironmentProfile })}
                className="w-full appearance-none bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs font-mono p-3 rounded-lg outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
                {Object.values(EnvironmentProfile).map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-[10px]">
                ▼
            </div>
        </div>
        <p className="mt-2 text-[10px] text-zinc-600">
            * Sensor calibration adjusts automatically based on detected room signature.
        </p>
      </div>

    </div>
  );
};

export default SystemModes;
